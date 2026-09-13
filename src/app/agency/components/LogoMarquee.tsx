"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/** Client logos (brand names, not UI copy). A lockup can have several parts. */
const LOGOS = [
  [{ src: "/images/agency/logo-entei.svg", alt: "ENTEI", width: 114, height: 24 }],
  [{ src: "/images/agency/logo-rem-met.svg", alt: "REM-MET", width: 173, height: 28 }],
  // Suseu lockup = icon + wordmark.
  [
    { src: "/images/agency/logo-suseu-icon.svg", alt: "", width: 33, height: 33 },
    { src: "/images/agency/logo-suseu-wordmark.svg", alt: "Suseu", width: 82, height: 21 },
  ],
  [{ src: "/images/agency/logo-ecomgo.svg", alt: "ecomgo", width: 115, height: 32 }],
];

/** Copies of the logo set on the track; 3 keep the strip filled while it loops. */
const COPIES = 3;
const LOOP_SECONDS = 24;

/**
 * Endless logo strip sliding right → left under the concrete radial glow
 * (Figma "Ellipse 11"), which fades the logos out towards both edges.
 * With reduced motion the strip stands still.
 */
export default function LogoMarquee({ label }: { label: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mt-14 -mb-14 flex h-35 w-full max-w-248 items-center overflow-hidden mask-x-from-85% mask-x-to-100%">
      <motion.div
        className="flex w-max"
        initial={{ x: "0%" }}
        animate={
          reduceMotion ? { x: "0%" } : { x: ["0%", `-${100 / COPIES}%`] }
        }
        transition={{ duration: LOOP_SECONDS, ease: "linear", repeat: Infinity }}
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul
            key={copy}
            aria-label={copy === 0 ? label : undefined}
            aria-hidden={copy > 0 || undefined}
            className="flex shrink-0 items-end gap-10 pr-10 md:gap-16 md:pr-16"
          >
            {LOGOS.map((parts) => (
              <li key={parts[0].src} className="flex shrink-0 items-center gap-2.5">
                {parts.map(({ src, alt, width, height }) => (
                  <Image
                    key={src}
                    src={src}
                    alt={copy === 0 ? alt : ""}
                    width={width}
                    height={height}
                  />
                ))}
              </li>
            ))}
          </ul>
        ))}
      </motion.div>

      <Image
        src="/images/agency/logos-glow.svg"
        alt=""
        width={992}
        height={140}
        className="pointer-events-none absolute inset-0 size-full max-w-none object-fill"
      />
    </div>
  );
}
