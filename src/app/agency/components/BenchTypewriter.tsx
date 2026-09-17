"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cx } from "@/lib/utils";

/** Scroll range (0–1 of the pinned track) over which the text gets typed. */
const TYPE_START = 0.05;
const TYPE_END = 0.8;

/**
 * Typed text: the written part is visible, the rest stays in the layout but
 * transparent, so lines never reflow while typing. The caret sits after the
 * last typed character (absolute ::after on the inline span → last line box).
 */
function Typed({
  text,
  count,
  caret,
}: {
  text: string;
  count: number;
  caret: boolean;
}) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        <span
          className={cx(
            "relative",
            caret &&
              "after:absolute after:-right-1 after:bottom-[0.08em] after:h-[0.8em] after:w-[0.06em] after:bg-ink",
          )}
        >
          {text.slice(0, count)}
        </span>
        <span className="opacity-0">{text.slice(count)}</span>
      </span>
    </>
  );
}

/**
 * "Koniec z odsyłaniem developerów na ławkę." types itself while the visitor
 * scrolls: the section pins for a tall scroll track and scroll progress maps
 * to the number of typed characters (title first, then the subtitle).
 * With reduced motion the text is shown in full and nothing pins.
 */
export default function BenchTypewriter({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Same markup on server and client; reduced motion switches after mount.
  const [enabled, setEnabled] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const raw = scrollable > 0 ? -rect.top / scrollable : 1;
    setProgress(
      Math.min(Math.max((raw - TYPE_START) / (TYPE_END - TYPE_START), 0), 1),
    );
  }, []);

  // Lenis drives the smooth scroll; native events cover reduced-motion/no-Lenis.
  useLenis(update);
  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const total = title.length + subtitle.length;
  const typed = enabled ? Math.round(progress * total) : total;
  const titleCount = Math.min(typed, title.length);
  const subtitleCount = Math.max(typed - title.length, 0);
  const typing = enabled && typed < total;

  return (
    <div ref={trackRef} className={cx("relative", enabled && "h-[250svh]")}>
      <div
        className={cx(
          "flex min-h-(--section-h-md) flex-col items-center justify-center gap-6 px-4 text-center md:min-h-[752px] md:px-16",
          enabled && "sticky top-0 h-svh min-h-0 md:min-h-0",
        )}
      >
        <h2 className="t-title-xl max-w-[773px] font-semibold leading-title">
          <Typed
            text={title}
            count={titleCount}
            caret={typing && typed <= title.length}
          />
        </h2>
        <p className="t-lead max-w-[749px]">
          <Typed
            text={subtitle}
            count={subtitleCount}
            caret={typing && typed > title.length}
          />
        </p>
      </div>
    </div>
  );
}
