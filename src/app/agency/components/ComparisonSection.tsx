import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import TextReveal from "@/components/TextReveal";
import { cx } from "@/lib/utils";

import QualityIndicator from "./QualityIndicator";

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
        "flex flex-col gap-2 rounded-xl p-4 md:gap-4 md:rounded-2xl md:p-6",
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
      {/* Time + price read as one tight pair (8px on desktop, per Figma). */}
      <div className="t-card-value flex flex-col pt-1 md:gap-2 md:pt-0">
        <p>{time}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}

/** Two-tone statement: muted/accent first line(s), then the main line. */
function Statement({
  lines,
  className,
}: {
  lines: ReactNode[];
  className: string;
}) {
  return (
    <TextReveal
      as="p"
      trigger="inView"
      mask={false}
      stagger={0.06}
      className={cx("t-title-md", className)}
      lines={lines}
    />
  );
}

const CARD =
  "flex flex-col gap-6 rounded-2xl md:min-h-[554px] md:gap-8 md:rounded-3xl";

export default async function ComparisonSection() {
  const t = await getTranslations("agency");
  const tc = await getTranslations("agency.comparison");

  const tile = (variant: Tile) => ({
    variant,
    title: tc(`${variant}.title`),
    description: tc(`${variant}.description`),
    time: tc(`${variant}.time`),
    price: tc(`${variant}.price`),
  });

  const indicator = (id: "others" | "us") => ({
    value: tc(`indicators.${id}.value`),
    label: tc(`indicators.${id}.label`),
    detail: tc(`indicators.${id}.detail`),
  });

  return (
    <section className="flex flex-col gap-6 bg-concrete px-4 py-10 md:gap-10 md:p-16">
      <TextReveal
        as="h2"
        trigger="inView"
        mask={false}
        stagger={0.06}
        className="t-title-xl max-w-[773px] text-ink"
        lines={[
          tc("title"),
          <span key="muted" className="text-gray-600">
            {tc("titleMuted")}
          </span>,
        ]}
      />

      {/* Row 1: pricing comparison + quality promise. Equal height when stacked. */}
      <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
        <div
          className={cx(
            CARD,
            "justify-center bg-linear-163 from-graphite from-12% to-gray-950 to-80% p-4 md:p-8",
          )}
        >
          <Image
            src="/images/agency/entei-wordmark-white.svg"
            alt={t("logoAlt")}
            width={96}
            height={20}
            className="mx-2 mt-2 md:mx-0 md:mt-0"
          />

          <div className="grid auto-rows-fr grid-cols-2 gap-2 md:gap-4">
            <PriceTile {...tile("others")} />
            <PriceTile {...tile("us")} />
          </div>

          <div className="flex flex-col gap-4 px-2 pb-2 md:gap-8 md:px-0 md:pb-0">
            <Statement
              className="text-gray-200"
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
              <span className="md:block">{tc("bodyLine1")}</span>{" "}
              <span className="md:block">{tc("bodyLine2")}</span>
            </TextReveal>
          </div>
        </div>

        <div
          className={cx(CARD, "justify-end border border-gray-500 p-6 md:p-8")}
        >
          <Statement
            className="text-ink"
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
      </div>

      {/* Row 2: lead-quality indicators + the performance specialist. */}
      <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
        <div
          className={cx(CARD, "justify-end border border-gray-500 p-6 md:p-8")}
        >
          <div className="flex flex-col gap-6 md:gap-8">
            <QualityIndicator {...indicator("others")} tone="muted" />
            <QualityIndicator {...indicator("us")} tone="accent" />
          </div>
          <Statement
            className="text-ink"
            lines={[
              <span key="muted" className="text-gray-600">
                {tc("methodsMuted")}
              </span>,
              tc("methodsLine"),
            ]}
          />
          <TextReveal
            as="p"
            trigger="inView"
            mask={false}
            delay={0.15}
            className="t-card-body text-charcoal"
          >
            {tc("methodsBody")}
          </TextReveal>
        </div>

        <div
          className={cx(
            CARD,
            "relative min-h-110 justify-between overflow-hidden bg-linear-163 from-graphite from-12% to-gray-950 to-80% p-6 md:p-8",
          )}
        >
          <Image
            src="/images/agency/performance-specialist.webp"
            alt={tc("specialistAlt")}
            width={720}
            height={729}
            sizes="(min-width: 768px) 671px, 100vw"
            className="absolute inset-0 size-full object-cover md:inset-auto md:-top-[126px] md:-left-[108px] md:h-[680px] md:w-[671px] md:max-w-none"
          />
          <Image
            src="/images/agency/entei-wordmark-white.svg"
            alt={t("logoAlt")}
            width={96}
            height={20}
            className="relative"
          />
          <div className="relative flex flex-col gap-4 md:gap-6">
            <TextReveal
              as="p"
              trigger="inView"
              mask={false}
              className="t-title-md text-concrete"
            >
              {tc.rich("specialistTitle", {
                accent: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
              })}
            </TextReveal>
            <TextReveal
              as="p"
              trigger="inView"
              mask={false}
              delay={0.15}
              className="t-card-body text-gray-400"
            >
              {tc("specialistBody")}
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
