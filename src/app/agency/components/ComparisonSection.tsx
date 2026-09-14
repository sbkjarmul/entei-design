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
        "flex flex-col gap-4 rounded-2xl p-6",
        isUs
          ? "bg-linear-136 from-ember from-15% to-primary to-95% text-black"
          : "border border-gray-800 bg-charcoal text-white",
      )}
    >
      <p className="t-lead-sm font-semibold leading-title tracking-loose">
        {title}
      </p>
      <p
        className={cx(
          "t-caption leading-lead font-medium tracking-loose",
          isUs ? "text-gray-900" : "text-gray-400",
        )}
      >
        {description}
      </p>
      <p className="t-lead leading-title tracking-loose">{time}</p>
      <p className="t-lead leading-title tracking-loose">{price}</p>
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
      small: (chunks) => <span className="text-base">{chunks}</span>,
    }),
  });

  return (
    <section className="grid auto-rows-fr gap-6 bg-concrete px-4 py-10 md:min-h-(--section-h-lg) md:auto-rows-auto md:grid-cols-2 md:content-center md:px-16 md:py-4">
      <div className="flex flex-col justify-center gap-8 rounded-3xl bg-linear-163 from-graphite from-12% to-gray-950 to-80% p-8">
        <Image
          src="/images/agency/entei-wordmark-white.svg"
          alt={t("logoAlt")}
          width={96}
          height={20}
        />

        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
          <PriceTile {...tile("others")} />
          <PriceTile {...tile("us")} />
        </div>

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
          className="t-lead-sm leading-lead text-gray-400"
        >
          {tc("body")}
        </TextReveal>
      </div>

      <div className="flex flex-col justify-end gap-8 rounded-3xl border border-gray-500 p-8">
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
          className="t-lead-sm leading-lead text-gray-700"
        >
          {tc("qualityBody")}
        </TextReveal>
      </div>
    </section>
  );
}
