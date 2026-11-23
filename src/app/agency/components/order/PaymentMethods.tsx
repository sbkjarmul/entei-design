import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { cx } from "@/lib/utils";

/** Logos shown at 24px height; `light` variants sit on dark surfaces. */
const LOGOS = [
  { alt: "PayU", dark: "payu-dark.svg", light: "payu-white.svg", width: 48 },
  { alt: "BLIK", dark: "blik.webp", light: "blik.webp", width: 46 },
  { alt: "Visa", dark: "visa-dark.svg", light: "visa-white.svg", width: 72 },
  {
    alt: "Mastercard",
    dark: "mastercard.webp",
    light: "mastercard.webp",
    width: 38,
  },
] as const;

/**
 * Accepted payment methods, required near the purchase and in the footer by
 * PayU's shop guidelines: brand logos plus a text badge for bank transfers
 * (pay-by-link has no single logo).
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

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <p className="t-caption font-medium tracking-normal">{t("label")}</p>
      <ul className="flex flex-wrap items-center gap-4">
        {LOGOS.map((logo) => (
          <li key={logo.alt}>
            <Image
              src={`/images/payments/${tone === "dark" ? logo.dark : logo.light}`}
              alt={logo.alt}
              width={logo.width}
              height={24}
              className="h-6 w-auto"
            />
          </li>
        ))}
        <li
          className={cx(
            "t-caption rounded-sm border px-2 py-1 font-semibold tracking-normal",
            tone === "dark" ? "border-ink/40" : "border-gray-600 text-gray-300",
          )}
        >
          {t("transfer")}
        </li>
      </ul>
    </div>
  );
}
