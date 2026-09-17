"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/** Ad and CRM platforms we run campaigns on (brand names, not UI copy). */
const LOGOS = [
  { src: "/images/agency/logo-meta.webp", alt: "Meta", width: 144, height: 29 },
  {
    src: "/images/agency/logo-google-ads.webp",
    alt: "Google Ads",
    width: 163,
    height: 51,
  },
  {
    src: "/images/agency/logo-highlevel.webp",
    alt: "HighLevel",
    width: 181,
    height: 41,
  },
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
    <div className="relative my-4 flex h-28 w-full max-w-198 items-center overflow-hidden mask-x-from-85% mask-x-to-100%">
      <motion.div
        className="flex w-max"
        initial={{ x: "0%" }}
        animate={
          reduceMotion ? { x: "0%" } : { x: ["0%", `-${100 / COPIES}%`] }
        }
        transition={{
          duration: LOOP_SECONDS,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul
            key={copy}
            aria-label={copy === 0 ? label : undefined}
            aria-hidden={copy > 0 || undefined}
            className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
          >
            {LOGOS.map(({ src, alt, width, height }) => (
              <li key={src} className="shrink-0">
                <Image
                  src={src}
                  alt={copy === 0 ? alt : ""}
                  width={width}
                  height={height}
                />
              </li>
            ))}
          </ul>
        ))}
      </motion.div>

      <Image
        src="/images/agency/logos-glow.svg"
        alt=""
        width={792}
        height={112}
        className="pointer-events-none absolute inset-0 size-full max-w-none object-fill"
      />
    </div>
  );
}
