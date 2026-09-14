import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import TextReveal from "@/components/TextReveal";
import { cx } from "@/lib/utils";

type Tile = "others" | "us";

/** "Other agencies" vs "With us" pricing tile (Figma "MinBox"). */
function PriceTile({
  title,
  description,
  time,
  price,
  variant,
}: {
  title: string;
  description: string;
  time: string;
  price: ReactNode;
  variant: Tile;
}) {
  const isUs = variant === "us";

  return (
    <div
      className={cx(
        "flex flex-col gap-4 rounded-xl p-4 md:rounded-2xl md:p-6",
        isUs
          ? "bg-linear-136 from-ember from-15% to-primary to-95% text-black"
          : "border border-gray-800 bg-charcoal text-white",
      )}
    >
      <div className="flex flex-col gap-2 md:gap-4">
        <p className="t-card-label">{title}</p>
        <p
          className={cx(
            "t-card-caption",
            isUs ? "text-gray-900" : "text-gray-400",
          )}
        >
          {description}
        </p>
      </div>
      {/* Mobile: time + price read as one tight pair; desktop keeps Figma's 16px rhythm. */}
      <div className="t-card-value flex flex-col md:gap-4">
        <p>{time}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}

export default async function ComparisonSection() {
  const t = await getTranslations("agency");
  const tc = await getTranslations("agency.comparison");

  const tile = (variant: Tile) => ({
    variant,
    title: tc(`${variant}.title`),
    description: tc(`${variant}.description`),
    time: tc(`${variant}.time`),
    price: tc.rich(`${variant}.price`, {
      small: (chunks) => <span className="text-xs md:text-base">{chunks}</span>,
    }),
  });

  return (
    <section className="grid auto-rows-fr gap-6 bg-concrete px-4 py-10 md:min-h-(--section-h-lg) md:auto-rows-auto md:grid-cols-2 md:content-center md:px-16 md:py-4">
      <div className="flex flex-col justify-center gap-6 rounded-2xl bg-linear-163 from-graphite from-12% to-gray-950 to-80% p-4 md:gap-8 md:rounded-3xl md:p-8">
        <Image
          src="/images/agency/entei-wordmark-white.svg"
          alt={t("logoAlt")}
          width={96}
          height={20}
          className="mx-2 mt-2 md:mx-0 md:mt-0"
        />

        {/* Two tiles side by side on every breakpoint, equal height. */}
        <div className="grid auto-rows-fr grid-cols-2 gap-2 md:gap-4">
          <PriceTile {...tile("others")} />
          <PriceTile {...tile("us")} />
        </div>

        <div className="flex flex-col gap-4 px-2 pb-2 md:gap-8 md:px-0 md:pb-0">
          <TextReveal
            as="p"
            trigger="inView"
            mask={false}
            stagger={0.06}
            className="t-title-md text-gray-200"
            lines={[
              <span key="accent" className="text-primary">
                {tc("statementAccent")}
              </span>,
              tc("statementLine2"),
              tc("statementLine3"),
            ]}
          />

          <TextReveal
            as="p"
            trigger="inView"
            mask={false}
            delay={0.15}
            className="t-card-body text-gray-400"
          >
            {tc("body")}
          </TextReveal>
        </div>
      </div>

      <div className="flex flex-col justify-end gap-4 rounded-2xl border border-gray-500 p-6 md:gap-8 md:rounded-3xl md:p-8">
        <TextReveal
          as="p"
          trigger="inView"
          mask={false}
          stagger={0.06}
          className="t-title-md text-ink"
          lines={[
            <span key="muted" className="text-gray-600">
              {tc("qualityMuted")}
            </span>,
            tc("qualityLine"),
          ]}
        />
        <TextReveal
          as="p"
          trigger="inView"
          mask={false}
          delay={0.15}
          className="t-card-body text-gray-700"
        >
          {tc("qualityBody")}
        </TextReveal>
      </div>
    </section>
  );
}
