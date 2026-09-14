"use client";

import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

/** ENTEI house easing, shared with TextReveal / Preloader. */
const EASE = [0.16, 1, 0.3, 1] as const;

/** Red hand-set underline (Figma "Vector 31") that draws in left → right. */
export default function HighlightUnderline({
  children,
  delay = 0.6,
}: {
  children: ReactNode;
  delay?: number;
}) {
  // MotionConfig: with reduced motion the underline appears without drawing in.
  return (
    <MotionConfig reducedMotion="user">
      <span className="relative inline-block">
        {children}
        <motion.span
          aria-hidden
          className="absolute -inset-x-1 -bottom-1 block h-1.25 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay, duration: 0.8, ease: EASE }}
        >
          <Image
            src="/images/agency/underline.svg"
            alt=""
            fill
            className="object-fill"
          />
        </motion.span>
      </span>
    </MotionConfig>
  );
}
