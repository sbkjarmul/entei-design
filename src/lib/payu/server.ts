/**
 * PayU REST API client (hosted checkout, redirect flow). SERVER ONLY: it reads
 * the POS secrets from env, so never import it from a client component.
 *
 * Docs: https://developers.payu.com/europe/docs/payment-flows/auth-and-order/
 *
 * Env (Vercel → Settings → Environment Variables):
 *   PAYU_ENV            "sandbox" | "production" (default: sandbox)
 *   PAYU_POS_ID         POS id (merchantPosId)
 *   PAYU_CLIENT_ID      OAuth client_id (usually equal to the POS id)
 *   PAYU_CLIENT_SECRET  OAuth client_secret
 *   PAYU_SECOND_KEY     "Drugi klucz (MD5)", verifies notification signatures
 */

import { createHash, timingSafeEqual } from "node:crypto";

const HOSTS = {
  sandbox: "https://secure.snd.payu.com",
  production: "https://secure.payu.com",
} as const;

export interface PayuConfig {
  host: string;
  posId: string;
  clientId: string;
  clientSecret: string;
  secondKey: string;
}

/** Returns null when PayU is not configured (e.g. local dev without keys). */
export function getPayuConfig(): PayuConfig | null {
  const {
    PAYU_ENV,
    PAYU_POS_ID,
    PAYU_CLIENT_ID,
    PAYU_CLIENT_SECRET,
    PAYU_SECOND_KEY,
  } = process.env;

  if (
    !PAYU_POS_ID ||
    !PAYU_CLIENT_ID ||
    !PAYU_CLIENT_SECRET ||
    !PAYU_SECOND_KEY
  ) {
    return null;
  }

  return {
    host: PAYU_ENV === "production" ? HOSTS.production : HOSTS.sandbox,
    posId: PAYU_POS_ID,
    clientId: PAYU_CLIENT_ID,
    clientSecret: PAYU_CLIENT_SECRET,
    secondKey: PAYU_SECOND_KEY,
  };
}

// ---------------------------------------------------------------------------
// OAuth (client_credentials). The token lives ~12h; cache it per server
// instance and refresh a minute early.
// ---------------------------------------------------------------------------

let cachedToken: { value: string; expiresAt: number; host: string } | null =
  null;

async function getAccessToken(config: PayuConfig): Promise<string> {
  if (
    cachedToken &&
    cachedToken.host === config.host &&
    cachedToken.expiresAt > Date.now() + 60_000
  ) {
    return cachedToken.value;
  }

  const res = await fetch(`${config.host}/pl/standard/user/oauth/authorize`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: config.clientId,
      client_secret: config.clientSecret,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new Error(`PayU OAuth failed: HTTP ${res.status}`);
  }

  const data = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!data.access_token) throw new Error("PayU OAuth: no access_token");

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
    host: config.host,
  };
  return cachedToken.value;
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

export interface PayuOrderInput {
  extOrderId: string;
  customerIp: string;
  description: string;
  /** Total in grosze. */
  totalAmount: number;
  notifyUrl: string;
  continueUrl: string;
  buyer: {
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
  };
  products: { name: string; unitPrice: number; quantity: number }[];
}

export interface PayuOrderResult {
  orderId: string;
  redirectUri: string;
}

export async function createPayuOrder(
  config: PayuConfig,
  input: PayuOrderInput,
): Promise<PayuOrderResult> {
  const token = await getAccessToken(config);

  const res = await fetch(`${config.host}/api/v2_1/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      notifyUrl: input.notifyUrl,
      continueUrl: input.continueUrl,
      customerIp: input.customerIp,
      merchantPosId: config.posId,
      extOrderId: input.extOrderId,
      description: input.description,
      currencyCode: "PLN",
      totalAmount: String(input.totalAmount),
      buyer: { ...input.buyer, language: "pl" },
      products: input.products.map((p) => ({
        name: p.name,
        unitPrice: String(p.unitPrice),
        quantity: String(p.quantity),
      })),
    }),
    // PayU answers 302 with JSON; following the redirect would lose the body.
    redirect: "manual",
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  const data = (await res.json().catch(() => null)) as {
    status?: { statusCode?: string; statusDesc?: string };
    redirectUri?: string;
    orderId?: string;
  } | null;

  if (
    data?.status?.statusCode !== "SUCCESS" ||
    !data.redirectUri ||
    !data.orderId
  ) {
    throw new Error(
      `PayU create order failed: HTTP ${res.status} ${data?.status?.statusCode ?? ""} ${data?.status?.statusDesc ?? ""}`.trim(),
    );
  }

  return { orderId: data.orderId, redirectUri: data.redirectUri };
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export type PayuOrderStatus =
  | "NEW"
  | "PENDING"
  | "WAITING_FOR_CONFIRMATION"
  | "COMPLETED"
  | "CANCELED";

export interface PayuNotification {
  order: {
    orderId: string;
    extOrderId?: string;
    orderCreateDate?: string;
    description: string;
    currencyCode: string;
    totalAmount: string;
    status: PayuOrderStatus;
    buyer?: {
      email?: string;
      phone?: string;
      firstName?: string;
      lastName?: string;
    };
    payMethod?: { type?: string };
    products?: { name: string; unitPrice: string; quantity: string }[];
  };
  localReceiptDateTime?: string;
}

/**
 * Verifies the `OpenPayu-Signature` header:
 * `sender=checkout;signature=<hex>;algorithm=MD5;content=DOCUMENT`.
 * signature = hash(rawBody + secondKey). Constant-time comparison.
 */
export function verifyPayuSignature(
  rawBody: string,
  header: string | null,
  secondKey: string,
): boolean {
  if (!header) return false;

  const parts = Object.fromEntries(
    header.split(";").map((pair) => {
      const [key, ...rest] = pair.split("=");
      return [key.trim().toLowerCase(), rest.join("=").trim()];
    }),
  );

  const algorithm = (parts.algorithm ?? "MD5").toUpperCase();
  const nodeAlgorithm =
    algorithm === "MD5"
      ? "md5"
      : algorithm === "SHA256" || algorithm === "SHA-256"
        ? "sha256"
        : null;
  if (!nodeAlgorithm || !parts.signature) return false;

  const expected = createHash(nodeAlgorithm)
    .update(rawBody + secondKey, "utf8")
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(parts.signature.toLowerCase(), "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
