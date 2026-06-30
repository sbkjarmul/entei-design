"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import Container from "@/components/Container";
import { headerMenu } from "@/components/Header/HeaderMenu/constants";
import { CALENDLY_URL } from "@/lib/caseStudies";

/** ENTEI house easing (expo-out-ish), shared with the hero TextReveal. */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Animated variant of the case-study header for the /realizacje page: slides in
 * from the top FIRST (≈0.8s), before the hero content reveals. The hero
 * TextReveals (works/page.tsx) are delayed to start as the header lands, so the
 * entrance reads as "header, then content" (berrielbrands-style intro).
 *
 * The CTA carries `mix-blend-difference` and must stay a top-level fixed element
 * to blend against page content — so it animates as its own `motion.a` rather
 * than being wrapped (a transformed wrapper would isolate the blend).
 */
export default function WorksHeader({ wantProject }: { wantProject: string }) {
  const reduceMotion = useReducedMotion();

  const transition = { duration: 0.8, ease: EASE };
  const initial = reduceMotion ? false : { y: "-100%" };
  const animate = { y: "0%" };

  return (
    <>
      <motion.header
        initial={initial}
        animate={animate}
        transition={transition}
        className="fixed top-0 z-50 w-full"
      >
        <Container className="flex h-[88px] max-w-none items-center justify-between px-6 md:px-10">
          <Link href="/" className="relative h-9 w-9 shrink-0">
            <Image
              src="/images/entei-logo-gray.svg"
              alt="Entei Design"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Same items as the homepage menu, frosted-glass pill. Hidden on mobile. */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/30 bg-white/50 px-2 py-1.5 backdrop-blur-md md:flex">
            {headerMenu.map((item) => {
              const href =
                item.href.startsWith("/") || item.href.startsWith("#")
                  ? item.href
                  : `/${item.href}`;
              return (
                <Link
                  key={item.href}
                  href={href}
                  className="rounded-xl px-4 py-2 text-xl font-normal text-gray-900 transition-colors hover:text-gray-500"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </Container>
      </motion.header>

      <motion.a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={initial}
        animate={animate}
        transition={transition}
        className="fixed right-6 top-0 z-50 flex h-[88px] items-center text-xl font-normal text-white underline decoration-1 underline-offset-8 mix-blend-difference transition-opacity hover:opacity-70 md:right-10"
      >
        {wantProject}
      </motion.a>
    </>
  );
}
