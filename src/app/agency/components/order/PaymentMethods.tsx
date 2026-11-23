import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { cx } from "@/lib/utils";

/**
 * Accepted payment methods, required near the purchase and in the footer by
 * PayU's shop guidelines: the official PayU logo (from PayU's brand files)
 * followed by the payment methods as text badges.
 */
export default async function PaymentMethods({
  tone = "dark",
  className,
}: {
  /** `dark` on concrete/red surfaces, `light` on dark cards. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const t = await getTranslations("agency.order.payments");
  const methods = t.raw("methods") as string[];

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <p className="t-caption font-medium tracking-normal">{t("label")}</p>
      <ul className="flex flex-wrap items-center gap-2">
        <li className="pr-2">
          <Image
            src={
              tone === "dark"
                ? "/images/payments/payu-dark.svg"
                : "/images/payments/payu-white.svg"
            }
            alt="PayU"
            width={48}
            height={24}
            className="h-6 w-auto"
          />
        </li>
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
