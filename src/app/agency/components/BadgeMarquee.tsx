"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Copies per row; 3 keep the row filled across the card while it loops. */
const COPIES = 3;

function BadgeRow({
  badges,
  duration,
  offset,
}: {
  badges: string[];
  /** Seconds for one full loop. */
  duration: number;
  /** Starting shift (0–1 of one copy) so the rows don't line up. */
  offset: number;
}) {
  const reduceMotion = useReducedMotion();
  const step = 100 / COPIES;
  const start = `-${offset * step}%`;

  return (
    <motion.div
      className="flex w-max"
      initial={{ x: start }}
      animate={
        reduceMotion
          ? { x: start }
          : { x: [start, `-${offset * step + step}%`] }
      }
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {Array.from({ length: COPIES }, (_, copy) => (
        <ul
          key={copy}
          aria-hidden={copy > 0 || undefined}
          className="flex shrink-0 gap-2 pr-2"
        >
          {badges.map((badge) => (
            <li
              key={badge}
              className="t-card-value shrink-0 rounded-full border border-gray-400 px-4 py-2 whitespace-nowrap text-white md:px-6"
            >
              {badge}
            </li>
          ))}
        </ul>
      ))}
    </motion.div>
  );
}

/**
 * Two rows of outlined badges drifting right → left across the specialist
 * card (Figma "Badges"). Rows move at different speeds and start offset.
 * With reduced motion they stand still.
 */
export default function BadgeMarquee({ badges }: { badges: string[] }) {
  const half = Math.ceil(badges.length / 2);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-16 flex flex-col gap-2.5 md:top-[109px]">
      <BadgeRow badges={badges.slice(0, half)} duration={22} offset={0} />
      <BadgeRow badges={badges.slice(half)} duration={28} offset={0.5} />
    </div>
  );
}
