"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

import { cx } from "@/lib/utils";

/** Tags this scramble can render as (kept narrow so the ref stays typed). */
type ScrambleTag = "span" | "div" | "p";

interface ScrambleTextProps {
  /** The label to scramble. Must be a plain string (decode runs char-by-char). */
  children: string;
  as?: ScrambleTag;
  className?: string;
  /**
   * What fires the effect:
   *  - `"host"` (default) → binds to the nearest `<a>`/`<button>` ancestor if
   *    there is one, else to the element itself. Use inside Buttons/links so the
   *    whole control triggers the decode on hover/focus.
   *  - `"self"` → always binds to the element itself.
   */
  trigger?: "host" | "self";
  /** ms between each letter starting to resolve (left→right cascade). */
  stagger?: number;
  /** ms a letter spends scrambling before it locks to its real glyph. */
  scramble?: number;
  /**
   * Recolor the label to brand red while active (default `true`). Turn off for
   * controls that already sit on a red surface (e.g. the solid primary CTA),
   * where the decode runs but the ink stays put.
   */
  recolor?: boolean;
}

/** Glyph pool for the "encoded" frames — grotesk + code-y symbols, no em dash. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}=+*#?$%&";

const randomGlyph = (seed: number) =>
  GLYPHS[(seed * 9301 + 49297) % GLYPHS.length];

/** How long a single glyph is held before swapping (ms). Higher = calmer. */
const GLYPH_HOLD = 55;

/**
 * ScrambleText — on hover/focus the label recolors to brand red (#ff2400) and
 * each letter "decodes" left→right: it flickers through random glyphs, then
 * locks to its real character. Inspired by the link effect on annnimate.com.
 *
 * Because Neue Haas is proportional, every letter is rendered in its own
 * fixed-width cell (sized to the *final* glyph): the scrambling glyph is
 * centered inside that cell, so changing its width never nudges the
 * neighbouring letters. Decode reads clean — no per-letter horizontal jitter.
 *
 * Reuse on CTAs, ghost buttons and links. Respects `prefers-reduced-motion`
 * (color change only, no scramble). The accessible name stays intact via
 * `aria-label`; the per-cell glyphs are visual-only (`aria-hidden`).
 */
export default function ScrambleText({
  children,
  as = "span",
  className,
  trigger = "host",
  stagger = 42,
  scramble = 300,
  recolor = true,
}: ScrambleTextProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const frameId = useRef<number>(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // The animated glyph of each non-space letter, in reading order.
    const cells = Array.from(
      root.querySelectorAll<HTMLElement>("[data-cell]"),
    );
    const host =
      trigger === "host"
        ? (root.closest("a, button") as HTMLElement | null) ?? root
        : root;

    const stop = () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      frameId.current = 0;
    };

    const reset = () => {
      cells.forEach((cell) => {
        cell.textContent = cell.dataset.char ?? "";
      });
    };

    // Active state (hover/focus): recolor + run the decode (skip decode when
    // the user prefers reduced motion).
    const enter = () => {
      if (recolor) root.style.color = "var(--color-primary)";
      if (reduceMotion) return;

      stop();
      // Time-based (not frame-based) so the pace is identical on 60Hz and
      // 120Hz/ProMotion displays. Each letter resolves after a left→right
      // stagger; only the letters inside their active window scramble, the
      // rest show their real glyph — a calm decode wave, not a wall of noise.
      const total = cells.length * stagger + scramble;
      let startTs = 0;

      const update = (ts: number) => {
        if (!startTs) startTs = ts;
        const elapsed = ts - startTs;
        // Quantised so every scrambling glyph swaps on the same calm cadence.
        const hold = Math.floor(elapsed / GLYPH_HOLD);

        for (let i = 0; i < cells.length; i++) {
          const start = i * stagger;
          const end = start + scramble;
          const cell = cells[i];
          if (elapsed < start || elapsed >= end) {
            // Not yet reached, or already settled → the real character.
            cell.textContent = cell.dataset.char ?? "";
          } else {
            cell.textContent = randomGlyph(i * 31 + hold * 7);
          }
        }

        if (elapsed < total) {
          frameId.current = requestAnimationFrame(update);
        } else {
          reset();
          frameId.current = 0;
        }
      };
      frameId.current = requestAnimationFrame(update);
    };

    // Reset to the clean label + inherited color.
    const leave = () => {
      stop();
      root.style.color = "";
      reset();
    };

    host.addEventListener("mouseenter", enter);
    host.addEventListener("mouseleave", leave);
    host.addEventListener("focus", enter, true);
    host.addEventListener("blur", leave, true);

    return () => {
      stop();
      host.removeEventListener("mouseenter", enter);
      host.removeEventListener("mouseleave", leave);
      host.removeEventListener("focus", enter, true);
      host.removeEventListener("blur", leave, true);
      root.style.color = "";
      reset();
    };
  }, [children, trigger, stagger, scramble, recolor, reduceMotion]);

  // Split into characters; each non-space letter is a fixed-width cell so the
  // scramble can never reflow its neighbours.
  const chars = Array.from(children);
  let cellIndex = 0;

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={rootRef}
      aria-label={children}
      className={cx(
        "relative inline-block whitespace-nowrap align-baseline transition-colors duration-300 ease-out",
        className,
      )}
    >
      {chars.map((ch, i) => {
        if (ch === " ") {
          return (
            <span key={i} aria-hidden>
              {" "}
            </span>
          );
        }
        cellIndex++;
        return (
          <span key={i} aria-hidden className="relative inline-block">
            {/* Sizer: reserves this glyph's exact width in the live font. */}
            <span className="invisible">{ch}</span>
            {/* Animated glyph: centered over the cell so width swaps stay put. */}
            <span
              data-cell
              data-char={ch}
              data-i={cellIndex - 1}
              className="absolute inset-0 text-center"
            >
              {ch}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
