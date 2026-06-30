"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import PortfolioCard from "@/components/PortfolioCard";

export interface WorkItem {
  slug: string;
  name: string;
  image: string;
  country: string;
  href: string;
  target?: "_blank";
}

interface WorksGridProps {
  items: WorkItem[];
}

const GRID_CLASS = "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";

/** ENTEI house easing (expo-out-ish), shared with TextReveal / headers. */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Entrance reveal lives on a wrapper around each card and uses explicit target
 * OBJECTS (not variant labels), so it never propagates into the inner link —
 * keeping it fully independent of the per-column scroll shift (the caterpillar).
 * Cards lift in from below with a soft fade, fired once per card as it enters
 * view; the column index gives a left→right cascade within each row.
 */
const CARD_HIDDEN = { opacity: 0, y: 48 };
const CARD_SHOWN = { opacity: 1, y: 0 };

/**
 * Per-column spring lag (the „caterpillar" feel). Stiffer = reacts to scroll
 * sooner and shifts less; softer = trails further. Ordered left → middle →
 * right, so the right column leads on scroll-down and the left trails.
 */
const SPRINGS = [
  { stiffness: 55, damping: 22, mass: 1 }, // left  (most lag)
  { stiffness: 110, damping: 27, mass: 1 }, // middle
  { stiffness: 320, damping: 34, mass: 1 }, // right (least lag)
];
/** Scale the raw scroll-vs-spring delta, then clamp so gaps stay sane (px). */
const GAIN = 0.18;
const MAX_SHIFT = 32;

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

const MotionLink = motion.create(Link);

/** Resolve responsive column count to drive the per-column lag. */
function useColumns() {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");
    const update = () => setCols(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);

  return cols;
}

/** translateY = clamp((scroll − laggedScroll) · gain): 0 when idle, grows with
 * scroll speed and the column's lag, snapping back as the spring catches up. */
function useColumnShift(
  scrollY: MotionValue<number>,
  config: (typeof SPRINGS)[number],
) {
  const lagged = useSpring(scrollY, config);
  return useTransform(
    [scrollY, lagged],
    ([raw, smooth]: number[]) => clamp((raw - smooth) * GAIN, MAX_SHIFT),
  );
}

/**
 * Shared tile grid of portfolio works. Two motion layers:
 *  - entrance: cards lift in from below (staggered) when the grid enters view;
 *  - scroll: the „Animated Grid" caterpillar — each column lags the scroll by a
 *    different amount, so columns stagger up/down while scrolling and realign
 *    when it stops (right column leads going down, left leads going up).
 * Used by the „Nasze realizacje" index and the „Ostatnie realizacje" section on
 * case studies. Respects `prefers-reduced-motion`; hover stays in
 * `PortfolioCard` (pure CSS).
 */
export default function WorksGrid({ items }: WorksGridProps) {
  const reduceMotion = useReducedMotion();
  const cols = useColumns();
  const { scrollY } = useScroll();

  // Three columns max → three springs, created unconditionally (hooks rule).
  const yLeft = useColumnShift(scrollY, SPRINGS[0]);
  const yMid = useColumnShift(scrollY, SPRINGS[1]);
  const yRight = useColumnShift(scrollY, SPRINGS[2]);

  // Map the visible column count onto the spring lanes (skip middle at 2 cols).
  const columnShifts: (MotionValue<number> | undefined)[] =
    reduceMotion || cols === 1
      ? []
      : cols === 2
        ? [yLeft, yRight]
        : [yLeft, yMid, yRight];

  return (
    <div className={GRID_CLASS}>
      {items.map((c, i) => {
        const shift = columnShifts[i % cols];
        return (
          <motion.div
            key={c.slug}
            initial={reduceMotion ? false : CARD_HIDDEN}
            whileInView={reduceMotion ? undefined : CARD_SHOWN}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % cols) * 0.08 }}
          >
            <MotionLink
              href={c.href}
              target={c.target}
              className="w-full"
              style={shift ? { y: shift } : undefined}
            >
              <PortfolioCard name={c.name} image={c.image} country={c.country} />
            </MotionLink>
          </motion.div>
        );
      })}
    </div>
  );
}
