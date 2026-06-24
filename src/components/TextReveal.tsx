"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cx } from "@/lib/utils";

/** Tags this reveal can render as (kept narrow so `motion[as]` stays typed). */
type RevealTag = "div" | "section" | "p" | "span" | "h1" | "h2" | "h3" | "h4";

interface TextRevealProps {
  /** Each entry is one masked line. Use for headings with manual line breaks. */
  lines?: ReactNode[];
  /** Single masked item (e.g. a heading string or a wrapped `<Link>`). */
  children?: ReactNode;
  /** Element to render as (default `div`). Headings should pass `h1`/`h2`/… */
  as?: RevealTag;
  className?: string;
  /** Extra classes on each line (the inner moving element). */
  lineClassName?: string;
  /**
   * When the reveal fires:
   *  - `"mount"` (default) → plays on entrance, once.
   *  - `"inView"` → plays when scrolled into view (reuse this for scroll later).
   */
  trigger?: "mount" | "inView";
  /** For `inView`: replay each time (default plays once). */
  once?: boolean;
  /** For `inView`: fraction of the element visible before firing. */
  amount?: number;
  /** Delay before the first line (s). */
  delay?: number;
  /** Gap between consecutive lines (s). */
  stagger?: number;
  /** Per-line duration (s). */
  duration?: number;
  /**
   * `true` (default) → line slides up from behind an overflow-clipped box.
   * `false` → soft fade + lift (no clipping; use for links so underlines/
   * descenders aren't cut).
   */
  mask?: boolean;
}

/** ENTEI house easing (expo-out-ish), shared with the Preloader. */
const EASE = [0.16, 1, 0.3, 1] as const;

export default function TextReveal({
  lines,
  children,
  as = "div",
  className,
  lineClassName,
  trigger = "mount",
  once = true,
  amount = 0.3,
  delay = 0,
  stagger = 0.08,
  duration = 0.7,
  mask = true,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const items: ReactNode[] = children != null ? [children] : (lines ?? []);
  const Tag = as;

  // Static render when the user prefers reduced motion: no transforms.
  if (reduceMotion) {
    return (
      <Tag className={className}>
        {items.map((item, i) => (
          <span key={i} className={cx("block", lineClassName)}>
            {item}
          </span>
        ))}
      </Tag>
    );
  }

  const hidden = mask ? { y: "110%" } : { opacity: 0, y: 16 };
  const shown = mask ? { y: "0%" } : { opacity: 1, y: 0 };

  // Each line drives itself (initial → animate/whileInView) so there's no
  // reliance on variant-label propagation through the mask wrapper.
  const renderLine = (item: ReactNode, i: number) => {
    const transition = { duration, ease: EASE, delay: delay + i * stagger };
    const activation =
      trigger === "inView"
        ? ({ whileInView: shown, viewport: { once, amount } } as const)
        : ({ animate: shown } as const);

    return (
      <motion.span
        className={cx("block", lineClassName)}
        initial={hidden}
        transition={transition}
        {...activation}
      >
        {item}
      </motion.span>
    );
  };

  return (
    <Tag className={className}>
      {items.map((item, i) =>
        mask ? (
          <span key={i} className="block overflow-hidden">
            {renderLine(item, i)}
          </span>
        ) : (
          <span key={i} className="block">
            {renderLine(item, i)}
          </span>
        ),
      )}
    </Tag>
  );
}
