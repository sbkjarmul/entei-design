"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const DURATION = 2000; // total visible time before the homepage is revealed

/**
 * Logo parts assembled inside a 100×100 box (units derived from the source
 * SVG viewBoxes). The mark is composed of three slices that fly into place:
 *   top   → drops down from above
 *   left  → rises into view (present almost from the start)
 *   right → streaks in from the right with a motion blur
 */
const PART_BOX = {
  top: { left: "0%", top: "0%", width: "66.64%", height: "33.36%" },
  left: { left: "0%", top: "33.36%", width: "66.64%", height: "66.64%" },
  right: { left: "33.36%", top: "0%", width: "66.64%", height: "66.64%" },
} as const;

export default function Preloader() {
  const t = useTranslations("loading");
  const reduceMotion = useReducedMotion();

  // Render the overlay on the very first paint (SSR + initial client render)
  // so the homepage never flashes underneath. The intro plays in full on every
  // page load / refresh.
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setPct(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setVisible(false);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  // Per-part entrance — disabled under prefers-reduced-motion.
  const partAnim = (
    from: { opacity: number; x?: number; y?: number; filter?: string },
    delay: number,
    duration: number,
  ) =>
    reduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: from,
          animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
          transition: { delay, duration, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <AnimatePresence onExitComplete={() => (document.body.style.overflow = "")}>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-white text-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Top-right tagline */}
          <span className="t-h4 absolute right-10 top-10">{t("tagline")}</span>

          {/* Bottom-left studio name */}
          <span className="t-h4 absolute bottom-10 left-10">{t("studio")}</span>

          {/* Centered counter + assembling logo */}
          <div className="flex flex-col items-center gap-10">
            <span className="t-h4 tabular-nums">({pct}%)</span>

            <div className="relative h-[88px] w-[88px] md:h-[104px] md:w-[104px]">
              <motion.img
                src="/images/loading/entei-logo-part-left.svg"
                alt=""
                className="absolute"
                style={PART_BOX.left}
                {...partAnim({ opacity: 0, y: 24 }, 0.05, 0.5)}
              />
              <motion.img
                src="/images/loading/entei-logo-part-top.svg"
                alt=""
                className="absolute"
                style={PART_BOX.top}
                {...partAnim({ opacity: 0, y: -32 }, 0.65, 0.5)}
              />
              <motion.img
                src="/images/loading/entei-logo-part-right.svg"
                alt=""
                className="absolute"
                style={PART_BOX.right}
                {...partAnim(
                  { opacity: 0, x: 72, filter: "blur(10px)" },
                  1.2,
                  0.6,
                )}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
