"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cx } from "@/lib/utils";

const PULSE = { duration: 1.8, repeat: Infinity, ease: "easeInOut" } as const;

/**
 * Red "live" lamp (Figma "Signal"): a steady dot with a breathing blurred glow
 * and a ring that pings outward, so the CTA reads as "on air / slots open".
 * With reduced motion it stays a static glowing dot.
 */
export default function SignalDot({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <span
      aria-hidden
      className={cx(
        "relative flex size-3 shrink-0 items-center justify-center rounded-full bg-primary",
        className,
      )}
    >
      {/* Ping ring: grows and fades out from the dot. */}
      <motion.span
        className="absolute inset-0 rounded-full bg-primary"
        initial={{ opacity: 0, scale: 1 }}
        animate={
          reduceMotion ? undefined : { opacity: [0.6, 0], scale: [1, 2.6] }
        }
        transition={{ ...PULSE, ease: "easeOut" }}
      />
      {/* Glow: breathes brighter and softer. */}
      <motion.span
        className="size-4 shrink-0 rounded-full bg-primary blur-[5.5px]"
        initial={{ opacity: 1, scale: 1 }}
        animate={
          reduceMotion
            ? undefined
            : { opacity: [1, 0.45, 1], scale: [1, 1.35, 1] }
        }
        transition={PULSE}
      />
    </span>
  );
}
