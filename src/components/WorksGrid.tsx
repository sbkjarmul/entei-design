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
    [scrollY, lagged] as [MotionValue<number>, MotionValue<number>],
    ([raw, smooth]) => clamp((raw - smooth) * GAIN, MAX_SHIFT),
  );
}

/**
 * Shared tile grid of portfolio works with the annnimate „Animated Grid" scroll
 * effect: each column lags the scroll by a different amount, so the columns
 * stagger up/down like a caterpillar while scrolling and realign when it stops
 * (right column leads going down, left leads going up). Used by the „Nasze
 * realizacje" index and the „Ostatnie realizacje" section on case studies.
 * Respects `prefers-reduced-motion`; hover stays in `PortfolioCard` (pure CSS).
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
          <MotionLink
            key={c.slug}
            href={c.href}
            target={c.target}
            className="w-full"
            style={shift ? { y: shift } : undefined}
          >
            <PortfolioCard name={c.name} image={c.image} country={c.country} />
          </MotionLink>
        );
      })}
    </div>
  );
}
