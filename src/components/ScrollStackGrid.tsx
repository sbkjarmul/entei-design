"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  cubicBezier,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { cx } from "@/lib/utils";

/**
 * Generic scroll-driven "scaler grid" — inspired by jh3y's CSS scroll-timeline
 * playbook (https://codepen.io/jh3y/pen/VYZwOwd), rebuilt on framer-motion so it
 * works cross-browser (Safari/Firefox) and rides the global Lenis smooth scroll.
 *
 * A tall section pins a full-height stage. It plays in two scroll phases:
 *   1. Intro   — the „hero" starts shown WHOLE (contain-fit, rounded, with a
 *                gutter) filling the viewport, then shrinks into its cell while
 *                every other item flies OUT FROM THE CENTRE, from behind the
 *                hero, into a full-width grid (translate + scale + fade).
 *   2. Browse  — once assembled, further scrolling pans the (taller-than-screen)
 *                grid up 1:1 so the user can read every card down to the last
 *                one; only then does the pin release and the next section show.
 *
 * Content-agnostic: pass any `items` + a `renderItem` (case-study cards,
 * testimonials, images…). Mobile (<md) and `prefers-reduced-motion` fall back to
 * a plain, fully-visible grid (no pin, no transforms).
 */
export interface ScrollStackGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey: (item: T, index: number) => string;
  /**
   * Renders the hero's contents. The hero box animates its width/height (so the
   * image stays cover-cropped with crisp rounded corners at every size), so this
   * MUST return something that fills the box — e.g. an absolutely-positioned link
   * with an `object-cover` <Image fill>. Falls back to `renderItem`.
   */
  renderHero?: (item: T, index: number) => React.ReactNode;
  /** Which item is the stretched centerpiece. Defaults to the first item. */
  centerIndex?: number;
  /** Extra classes on the outer <section>. */
  className?: string;
  /** Fallback grid classes for mobile / reduced-motion. */
  fallbackGridClassName?: string;
}

/** Hero box geometry (px): start (fullscreen) + end (cell) size and start offset. */
type HeroBox = { w0: number; h0: number; w1: number; h1: number; x0: number; y0: number };
const NO_BOX: HeroBox = { w0: 0, h0: 0, w1: 0, h1: 0, x0: 0, y0: 0 };
/** Gutter (px) around the hero when stretched full-screen at scroll start. */
const HERO_GUTTER = 32;
/** Aspect ratio of the hero when stretched — a wide, elongated banner, so its
 *  height stays close to the resting cell height (mostly a horizontal shrink). */
const HERO_STRETCH_ASPECT = 2.4;

/** ENTEI house easing (expo-out), shared with TextReveal / WorksGrid. */
const EASE = cubicBezier(0.16, 1, 0.3, 1);

const DESKTOP_COLS = 3;

/** Stage padding (px) — must mirror the pt-/pb- classes on the stage below. */
const STAGE_PT = 96; // pt-24
const STAGE_PB = 32; // pb-8

type Offset = { x: number; y: number };
const ORIGIN: Offset = { x: 0, y: 0 };

/**
 * Gate: picks the animated stage or the static fallback. Rendering one *or* the
 * other (rather than swapping a shared ref) keeps <AnimatedStack>'s `useScroll`
 * bound to a stable element for its whole lifetime.
 */
export default function ScrollStackGrid<T>(props: ScrollStackGridProps<T>) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const {
    items,
    renderItem,
    getKey,
    className,
    fallbackGridClassName = "grid grid-cols-1 gap-4 md:grid-cols-2",
  } = props;

  if (mounted && isDesktop && !reduceMotion) {
    return <AnimatedStack {...props} />;
  }

  // Fallback: plain, fully-visible grid (mobile / reduced-motion / SSR).
  return (
    <section className={className}>
      <div className={fallbackGridClassName}>
        {items.map((item, i) => (
          <div key={getKey(item, i)}>{renderItem(item, i)}</div>
        ))}
      </div>
    </section>
  );
}

function AnimatedStack<T>({
  items,
  renderItem,
  renderHero,
  getKey,
  centerIndex = 0,
  className,
}: ScrollStackGridProps<T>) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [heroBox, setHeroBox] = useState<HeroBox>(NO_BOX);
  const [offsets, setOffsets] = useState<Offset[]>([]);
  // Section height (px): viewport (for the pin) + intro scroll + grid overflow.
  const [sectionH, setSectionH] = useState<number | null>(null);
  // Progress at which the intro ends and the browse-pan begins.
  const [introEnd, setIntroEnd] = useState(0.5);
  // How far (px) the grid must pan up to reveal its bottom rows.
  const [overflow, setOverflow] = useState(0);

  const hero = Math.min(Math.max(centerIndex, 0), items.length - 1);

  // Progress 0 → 1 across the whole pinned section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Grid pans up during the browse phase; the whole assembled grid moves as one.
  const panY = useTransform(
    scrollYProgress,
    [Math.min(introEnd, 0.999), 1],
    [0, -overflow],
    { clamp: true },
  );

  // Measure everything the animation needs, in the pinned stage's frame (which
  // overlays the viewport once stuck, so the stage/cell delta is scroll-safe):
  //  - per-cell distance from centre (the „fly" vector);
  //  - the contain-scale that shows the hero WHOLE with a gutter at scroll start;
  //  - the grid overflow → intro/browse split + the section's pinned height.
  // Re-runs on resize / reflow (image + font loads shift heights).
  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const grid = gridRef.current;
      if (!stage || !grid) return;
      const sr = stage.getBoundingClientRect();
      const cxp = sr.left + sr.width / 2;
      const cyp = sr.top + sr.height / 2;
      const centerOf = (el: HTMLElement): Offset => {
        const r = el.getBoundingClientRect();
        return {
          x: cxp - (r.left + r.width / 2),
          y: cyp - (r.top + r.height / 2),
        };
      };

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Cards emerge FROM BEHIND THE HERO. The hero starts centred on the
      // viewport, so measuring the fly vectors from the stage centre (== viewport
      // centre once pinned) makes the cards start stacked behind it.
      setOffsets(cellRefs.current.map((el) => (el ? centerOf(el) : ORIGIN)));

      // Hero STARTS CENTRED ON THE VIEWPORT as a full-width, elongated banner and
      // mainly its width shrinks down to its resting cell (height barely changes).
      // Animating width/height (not transform-scale) keeps the object-cover crop
      // and rounded corners crisp at every size.
      const heroEl = cellRefs.current[hero];
      if (heroEl) {
        const cw = heroEl.offsetWidth;
        const ch = heroEl.offsetHeight;
        if (cw && ch) {
          const w0 = vw - HERO_GUTTER * 2;
          const h0 = Math.min(
            vh - HERO_GUTTER * 2,
            Math.max(ch, w0 / HERO_STRETCH_ASPECT),
          );
          // Cell position within the pinned stage (== its viewport position once
          // stuck) → place the start box centred on the viewport.
          const hrect = heroEl.getBoundingClientRect();
          const cellLeftRel = hrect.left - sr.left;
          const cellTopRel = hrect.top - sr.top;
          setHeroBox({
            w0,
            h0,
            w1: cw,
            h1: ch,
            x0: (vw - w0) / 2 - cellLeftRel,
            y0: (vh - h0) / 2 - cellTopRel,
          });
        }
      }

      const gridH = grid.offsetHeight;
      const visible = vh - STAGE_PT - STAGE_PB;
      const over = Math.max(0, Math.round(gridH - visible));
      const introScroll = Math.round(vh * 1.1);
      setOverflow(over);
      setSectionH(vh + introScroll + over);
      setIntroEnd(introScroll / (introScroll + over));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (gridRef.current) ro.observe(gridRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length, hero]);

  const gridColsStyle = {
    gridTemplateColumns: `repeat(${DESKTOP_COLS}, minmax(0, 1fr))`,
  };

  return (
    <section
      ref={sectionRef}
      data-scroll-stack
      className={cx("relative", className)}
      style={{ minHeight: sectionH ? `${sectionH}px` : "300vh" }}
    >
      {/* Stage overlays the viewport when pinned; top-aligned (below the header)
          so the first grid row is fully visible, never clipped at the top. */}
      <div
        ref={stageRef}
        className="sticky top-0 flex h-screen items-start justify-center overflow-hidden px-4 pt-24 pb-8 lg:px-6"
      >
        {/* pan wrapper — slides the assembled grid up during the browse phase */}
        <motion.div style={{ y: panY }} className="w-full will-change-transform">
          <div ref={gridRef} style={gridColsStyle} className="grid w-full gap-4">
            {items.map((item, i) =>
              i === hero ? (
                // aspect wrapper reserves the cell; the hero box floats above it.
                <div
                  key={getKey(item, i)}
                  ref={(el) => {
                    cellRefs.current[i] = el;
                  }}
                  className="relative aspect-[1.4]"
                >
                  <HeroItem
                    progress={scrollYProgress}
                    box={heroBox}
                    introEnd={introEnd}
                  >
                    {(renderHero ?? renderItem)(item, i)}
                  </HeroItem>
                </div>
              ) : (
                <div
                  key={getKey(item, i)}
                  ref={(el) => {
                    cellRefs.current[i] = el;
                  }}
                >
                  <StackItem
                    progress={scrollYProgress}
                    offset={offsets[i] ?? ORIGIN}
                    order={i}
                    total={items.length}
                    introEnd={introEnd}
                  >
                    {renderItem(item, i)}
                  </StackItem>
                </div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * The centerpiece: starts stretched to (nearly) the full viewport, then shrinks
 * into its grid cell over the intro phase. Animates WIDTH + HEIGHT (not
 * transform-scale) so the object-cover image re-crops and the fixed border-radius
 * stays crisp and visible at every size — and it shrinks on BOTH axes. Absolutely
 * positioned so resizing never reflows the surrounding grid.
 */
function HeroItem({
  progress,
  box,
  introEnd,
  children,
}: {
  progress: MotionValue<number>;
  box: HeroBox;
  introEnd: number;
  children: React.ReactNode;
}) {
  const end = introEnd * 0.8;
  const width = useTransform(progress, [0, end], [box.w0, box.w1], { ease: EASE });
  const height = useTransform(progress, [0, end], [box.h0, box.h1], { ease: EASE });
  const x = useTransform(progress, [0, end], [box.x0, 0], { ease: EASE });
  const y = useTransform(progress, [0, end], [box.y0, 0], { ease: EASE });
  return (
    <motion.div
      className="absolute left-0 top-0 z-30 will-change-[width,height,transform]"
      style={{ width, height, x, y }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A surrounding item: sits hidden behind the hero at the centre, then flies out
 * to its grid slot (translate + scale-up + fade). `order` staggers the exits so
 * they cascade rather than move in unison. All motion completes within the intro.
 */
function StackItem({
  progress,
  offset,
  order,
  total,
  introEnd,
  children,
}: {
  progress: MotionValue<number>;
  offset: Offset;
  order: number;
  total: number;
  introEnd: number;
  children: React.ReactNode;
}) {
  const stagger = total > 1 ? (order / (total - 1)) * 0.3 : 0;
  const start = introEnd * (0.1 + stagger);
  const end = introEnd * Math.min(0.6 + stagger, 0.98);

  const x = useTransform(progress, [start, end], [offset.x, 0], { ease: EASE });
  const y = useTransform(progress, [start, end], [offset.y, 0], { ease: EASE });
  const scale = useTransform(progress, [start, end], [0.6, 1], { ease: EASE });
  const opacity = useTransform(
    progress,
    [start, start + introEnd * 0.15],
    [0, 1],
  );

  return (
    <motion.div
      className="relative z-10 origin-center will-change-transform"
      style={{ x, y, scale, opacity }}
    >
      {children}
    </motion.div>
  );
}
