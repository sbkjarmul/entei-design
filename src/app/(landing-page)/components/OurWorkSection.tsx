"use client";

import Link from "next/link";

import PortfolioCard from "@/components/PortfolioCard";
import ScrollStackGrid from "@/components/ScrollStackGrid";

const DEV = process.env.NODE_ENV !== "production";

interface Work {
  href: string;
  target?: "_blank";
  image: string;
  name: string;
  country: string;
}

/**
 * Realizacje shown on the homepage — same caption-less tile as the „/realizacje"
 * index (<PortfolioCard>: image only, name + country revealed on hover). Order
 * matters: the middle item (index 4) becomes the stretched hero in
 * <ScrollStackGrid>, so a strong visual sits in the centre of row 1.
 */
const WORKS: Work[] = [
  {
    href: "/case-study/italiana",
    target: "_blank",
    image: "/images/case-studies/italiana-case-study-card.png",
    name: "Italiana",
    country: "Polska",
  },
  // index 1 → centre of row 1 → the stretched hero (see centerIndex below)
  {
    href: "/case-study/suseu",
    target: "_blank",
    image: "/images/case-studies/suseu-case-study-card.png",
    name: "Suseu",
    country: "Polska",
  },
  {
    href: "https://www.instagram.com/p/DVwKd0cCHlL",
    target: "_blank",
    image: "/images/case-studies/broscars-case-study-card.png",
    name: "Broscars",
    country: "Polska",
  },
  {
    href: "/case-study/rem-met",
    target: "_blank",
    image: "/images/case-studies/rem-met-case-study-card.png",
    name: "REM-MET",
    country: "Polska",
  },
  {
    href: "/case-study/art-mat",
    target: "_blank",
    image: "/images/case-studies/art-mat-case-study-card.png",
    name: "Art-Mat",
    country: "Polska",
  },
  {
    href: "/case-study/ceramido",
    target: "_blank",
    image: "/images/case-studies/ceramido-case-study-card.png",
    name: "Ceramido",
    country: "Polska",
  },
  {
    href: "/case-study/hatan",
    target: "_blank",
    image: "/images/case-studies/hatan-case-study-card.png",
    name: "Hatan",
    country: "Polska",
  },
];

export default function OurWorkSection() {
  return (
    <ScrollStackGrid
      items={WORKS}
      centerIndex={1}
      getKey={(w) => w.href}
      className="bg-black"
      fallbackGridClassName="grid grid-cols-1 gap-4 px-4 py-10 sm:px-8 md:grid-cols-2 md:py-20"
      renderItem={(w) => (
        <Link href={w.href} target={w.target} className="block w-full">
          {/* eager: tiles are transformed in the stage, where lazy-load stalls.
              unoptimized in dev only — the dev image optimizer stalls when all
              tiles request at once; prod stays optimized. */}
          <PortfolioCard
            name={w.name}
            image={w.image}
            country={w.country}
            priority
            unoptimized={DEV}
          />
        </Link>
      )}
      // Hero uses the SAME card as the others (rounded corners + hover), with
      // fillParent so it fills the animating box (width/height) as it shrinks.
      renderHero={(w) => (
        <Link href={w.href} target={w.target} className="absolute inset-0 block">
          <PortfolioCard
            name={w.name}
            image={w.image}
            country={w.country}
            priority
            unoptimized={DEV}
            fillParent
          />
        </Link>
      )}
    />
  );
}
