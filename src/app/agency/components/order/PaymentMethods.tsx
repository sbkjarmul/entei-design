import { getTranslations } from "next-intl/server";

import { cx } from "@/lib/utils";

/**
 * Accepted payment methods, required near the purchase and in the footer by
 * PayU's shop guidelines. Text badges for now.
 * TODO: swap for the official PayU/BLIK/Visa/Mastercard logos from the PayU
 * merchant panel once they are added to public/images/payments/.
 */
export default async function PaymentMethods({
  tone = "dark",
  className,
}: {
  /** `dark` text on concrete/red surfaces, `light` on dark cards. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const t = await getTranslations("agency.order.payments");
  const methods = t.raw("methods") as string[];

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <p className="t-caption font-medium tracking-normal">{t("label")}</p>
      <ul className="flex flex-wrap gap-2">
        {methods.map((method) => (
          <li
            key={method}
            className={cx(
              "t-caption rounded-sm border px-2 py-1 font-semibold tracking-normal",
              tone === "dark"
                ? "border-ink/40"
                : "border-gray-600 text-gray-300",
            )}
          >
            {method}
          </li>
        ))}
      </ul>
    </div>
  );
}
