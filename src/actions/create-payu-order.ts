"use server";

import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";

import OrderNotificationEmailTemplate from "@/emails/order-notification-email-template";
import { AGENCY_HOSTS, AGENCY_PATH } from "@/lib/agency";
import { orderSchema, type OrderFormValues } from "@/lib/payu/order-schema";
import { PRODUCTS, formatPln, grossAmount } from "@/lib/payu/products";
import { createPayuOrder, getPayuConfig } from "@/lib/payu/server";

const ORDERS_INBOX = "entei.designs@gmail.com";

async function notifyNewOrder(
  orderNumber: string,
  values: OrderFormValues,
  amount: string,
) {
  try {
    const t = await getTranslations({
      locale: "pl",
      namespace: "agency.order",
    });
    const productName = t(`products.${values.productId}.name`);
    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "ENTEI <noreply@entei.design>",
      to: ORDERS_INBOX,
      subject: `Nowe zamówienie ${orderNumber} (czeka na płatność): ${productName}`,
      react: OrderNotificationEmailTemplate({
        stage: "created",
        orderNumber,
        productName,
        amount,
        buyerName: `${values.firstName} ${values.lastName}`,
        buyerEmail: values.email,
        buyerPhone: values.phone,
        invoice: values.wantsInvoice
          ? {
              company: values.companyName ?? "",
              nip: (values.nip ?? "").replace(/[\s-]/g, ""),
              address: `${values.street}, ${values.postalCode} ${values.city}`,
            }
          : undefined,
      }),
    });
  } catch (error) {
    // Never block the payment on e-mail; PayU's panel still has the order.
    console.error("New-order e-mail failed:", error);
  }
}

/** Minimum time (ms) a human needs to fill the form; faster = bot. */
const MIN_FILL_TIME_MS = 3000;

export type CreateOrderResult =
  | { ok: true; redirectUri: string }
  | { ok: false; error: "validation" | "unavailable" | "payment" };

/**
 * Creates a PayU order for the chosen product and returns PayU's hosted
 * checkout URL. The amount comes from the server-side product table only.
 */
export async function createPayuOrderAction(
  input: unknown,
  meta: { website?: string; loadedAt?: number },
): Promise<CreateOrderResult> {
  // Bot traps. A hit returns a generic error and creates nothing.
  if (meta.website?.trim()) return { ok: false, error: "validation" };
  if (
    typeof meta.loadedAt === "number" &&
    meta.loadedAt > 0 &&
    Date.now() - meta.loadedAt < MIN_FILL_TIME_MS
  ) {
    return { ok: false, error: "validation" };
  }

  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "validation" };
  const values = parsed.data;

  const config = getPayuConfig();
  if (!config) {
    console.error("PayU is not configured (missing PAYU_* env vars)");
    return { ok: false, error: "unavailable" };
  }

  const headerList = await headers();
  const host = (
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    ""
  )
    .split(",")[0]
    .trim();
  const proto =
    headerList.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";
  const origin = `${proto}://${host}`;
  const hostname = host.split(":")[0].toLowerCase();
  // On agency.entei.pl the landing lives at "/", elsewhere at "/agency".
  const landingBase = AGENCY_HOSTS.includes(hostname) ? "" : AGENCY_PATH;

  const customerIp =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "127.0.0.1";

  const product = PRODUCTS[values.productId];
  const amount = grossAmount(product.netAmount);
  const extOrderId = `ENT-${product.code}-${Date.now().toString(36).toUpperCase()}-${crypto
    .randomUUID()
    .slice(0, 8)
    .toUpperCase()}`;

  const t = await getTranslations({ locale: "pl", namespace: "agency.order" });
  const productName = t(`products.${values.productId}.payuName`);

  try {
    const { redirectUri } = await createPayuOrder(config, {
      extOrderId,
      customerIp,
      description: `${productName} (${extOrderId})`,
      totalAmount: amount,
      notifyUrl: `${origin}/api/payu/notify`,
      continueUrl: `${origin}${landingBase}/zamowienie/status?order=${encodeURIComponent(extOrderId)}`,
      buyer: {
        email: values.email,
        phone: values.phone,
        firstName: values.firstName,
        lastName: values.lastName,
      },
      products: [{ name: productName, unitPrice: amount, quantity: 1 }],
    });

    // Invoice data never goes to PayU (its descriptions end up in bank
    // transfer titles). E-mail it to ENTEI now; the paid e-mail from the
    // notification references the same order number.
    await notifyNewOrder(extOrderId, values, formatPln(amount));

    return { ok: true, redirectUri };
  } catch (error) {
    console.error("PayU order creation failed:", error);
    return { ok: false, error: "payment" };
  }
}
