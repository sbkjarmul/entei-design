import { getTranslations } from "next-intl/server";

import Button from "@/components/Button";
import TextReveal from "@/components/TextReveal";
import { AGENCY_PATH } from "@/lib/agency";
import {
  PRODUCTS,
  formatPln,
  grossAmount,
  type ProductId,
} from "@/lib/payu/products";

import AvailabilityNote from "./AvailabilityNote";
import BookingButton from "./BookingButton";

const PLANS = [
  { key: "leads", productId: "meta-ads" },
  { key: "brand", productId: "branding" },
] as const satisfies readonly { key: string; productId: ProductId }[];

/**
 * "Cennik." — two plans with net + gross price, online order CTA (PayU),
 * booking CTA and feature list (Figma 714:95).
 */
export default async function PricingSection() {
  const t = await getTranslations("agency");
  const tp = await getTranslations("agency.pricing");

  return (
    <section
      id="cennik"
      className="flex scroll-mt-8 flex-col gap-6 bg-concrete px-4 py-10 md:gap-8 md:px-16 md:py-4"
    >
      <TextReveal
        as="h2"
        trigger="inView"
        mask={false}
        className="t-title-xl tracking-loose text-black"
      >
        {tp("title")}
      </TextReveal>
      <hr className="border-gray-500" />

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        {PLANS.map(({ key: plan, productId }) => {
          const product = PRODUCTS[productId];
          const gross = formatPln(grossAmount(product.netAmount));

          return (
            <article
              key={plan}
              className="flex flex-col gap-10 py-6 md:gap-16 md:p-8"
            >
              <div className="t-title-xl flex flex-col gap-2 tracking-loose">
                <h3 className="text-graphite">{tp(`plans.${plan}.name`)}</h3>
                <p className="text-gray-600">
                  {tp.rich(`plans.${plan}.price`, {
                    small: (chunks) => (
                      <span className="t-title-lg">{chunks}</span>
                    ),
                  })}
                </p>
                <p className="t-lead-sm text-gray-800">
                  {product.periods > 1
                    ? tp("grossMonthly", { amount: gross })
                    : tp("gross", { amount: gross })}
                </p>
              </div>

              <div className="flex w-full max-w-[411px] flex-col items-center gap-2">
                <Button
                  href={`${AGENCY_PATH}/zamowienie/${productId}`}
                  variant="dark"
                  rounded={false}
                  className="w-full justify-center rounded-sm px-6 py-4 leading-5 tracking-loose"
                >
                  {tp("orderCta")}
                </Button>
                <BookingButton
                  variant="primary"
                  label={t("cta.label")}
                  className="w-full justify-center"
                />
                <AvailabilityNote label={t("cta.availability")} tone="dark" />
              </div>

              <ul className="t-lead flex list-disc flex-col gap-2 pl-9 text-gray-700">
                {(tp.raw(`plans.${plan}.features`) as string[]).map(
                  (feature) => (
                    <li key={feature}>{feature}</li>
                  ),
                )}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
