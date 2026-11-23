/**
 * Products sold online through PayU. Shared by the order page (display) and the
 * server action (charging). The server ALWAYS prices an order from this table by
 * product id; an amount sent by the browser is never trusted.
 *
 * Amounts are in grosze (1 PLN = 100), as PayU expects.
 */

export const VAT_RATE = 0.23;

export const PRODUCT_IDS = ["meta-ads", "branding"] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

export interface Product {
  id: ProductId;
  /** Two-letter code embedded in the order number (ENT-<code>-…). */
  code: string;
  /** Net price of what is charged online now. */
  netAmount: number;
  /**
   * Billing periods in the minimum commitment. 1 = one-off. For the Meta Ads
   * subscription the first month is paid online, the rest by VAT invoice.
   */
  periods: number;
}

export const PRODUCTS: Record<ProductId, Product> = {
  "meta-ads": { id: "meta-ads", code: "MA", netAmount: 300_000, periods: 3 },
  branding: { id: "branding", code: "BR", netAmount: 500_000, periods: 1 },
};

export function isProductId(value: unknown): value is ProductId {
  return (
    typeof value === "string" &&
    (PRODUCT_IDS as readonly string[]).includes(value)
  );
}

/** Product behind an order number like `ENT-MA-LX4K2Q-1A2B3C4D`. */
export function productIdFromOrderNumber(
  orderNumber: string | undefined,
): ProductId | null {
  const code = orderNumber?.split("-")[1];
  return PRODUCT_IDS.find((id) => PRODUCTS[id].code === code) ?? null;
}

export function grossAmount(netAmount: number): number {
  return Math.round(netAmount * (1 + VAT_RATE));
}

/** "3 690 zł" / "3 690,50 zł", Polish grouping, grosze only when non-zero. */
export function formatPln(amount: number): string {
  const hasGrosze = amount % 100 !== 0;
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: hasGrosze ? 2 : 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(amount / 100);
}
