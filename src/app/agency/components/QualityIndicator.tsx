"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cx } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Horizontal bar with a percentage and a two-line description (Figma
 * "Indicator"). The fill grows to its value when scrolled into view; with
 * reduced motion it is drawn at full value straight away.
 */
export default function QualityIndicator({
  value,
  label,
  detail,
  tone,
  fill,
}: {
  /** Label, e.g. "10%". */
  value: string;
  /** Bar fill in % of its width (Figma: 14% for "10%", full for "89%"). */
  fill: number;
  label: string;
  detail: string;
  tone: "muted" | "accent";
}) {
  const reduceMotion = useReducedMotion();
  const percent = Math.min(Math.max(fill, 0), 100);

  return (
    <div className="flex w-full max-w-[439px] flex-col gap-2 md:gap-4">
      <div className="flex items-center gap-2.5">
        <div
          aria-hidden
          className="h-8 w-full max-w-[289px] overflow-hidden rounded-lg border border-gray-400 bg-gray-300 md:h-10"
        >
          <motion.div
            className={cx(
              "h-full",
              tone === "accent" ? "bg-primary" : "bg-graphite",
            )}
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 1.2, ease: EASE }
            }
          />
        </div>
        <p className="t-title-lg shrink-0 font-semibold leading-display text-black">
          {value}
        </p>
      </div>
      <p className="t-card-body flex flex-col gap-1 md:leading-title">
        <span className="text-black">{label}</span>
        <span className="text-charcoal">{detail}</span>
      </p>
    </div>
  );
}
