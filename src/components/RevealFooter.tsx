"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";

interface RevealFooterProps {
  /** Stopka do odsłonięcia (dowolny element). */
  children: ReactNode;
  /**
   * Klasa tła kontenera — MUSI odpowiadać tłu stopki (np. `bg-gray-300`,
   * `bg-primary`). Wypełnia odsłanianą strefę, dzięki czemu pod krawędzią
   * sekcji nie ma luki w innym kolorze.
   */
  bgClassName?: string;
  /**
   * Jak mocno treść stopki dryfuje w górę podczas odsłaniania (0–1, ułamek
   * wysokości stopki). Większe = wyraźniej „scrolluje się" z tyłu. Domyślnie 0.6.
   */
  parallaxRatio?: number;
  /** Od jakiej szerokości viewportu włączyć efekt (px). Domyślnie 768. */
  breakpoint?: number;
}

/**
 * RevealFooter — przenośny efekt odsłaniania stopki przez zsuwającą się sekcję,
 * z parallaxem (stopka przewija się pod spodem wolniej niż treść).
 *
 * WYMAGANIA INTEGRACJI (3 kroki):
 *  1. Lenis aktywny w drzewie — owiń aplikację w `<SmoothScroll>` (ReactLenis
 *     z `root`). Bez Lenis efekt się nie animuje (parallax stoi przez `useLenis`).
 *  2. Warstwa treści strony musi być NIEPRZEZROCZYSTA i nad stopką:
 *     `position: relative; z-index: 30;` + własne tło (np. `bg-white`).
 *  3. Wyrenderuj `<RevealFooter>` TUŻ ZA tą warstwą (jako rodzeństwo), podając
 *     stopkę jako children i `bgClassName` zgodny z tłem stopki.
 *
 * Przykład:
 *   <div className="relative z-30 min-h-screen bg-white">…treść…</div>
 *   <RevealFooter bgClassName="bg-gray-300"><MojFooter /></RevealFooter>
 *
 * Na mobile (poniżej `breakpoint`) oraz przy `prefers-reduced-motion` renderuje
 * stopkę zwyczajnie w przepływie (bez przypinania i parallaxu).
 */
export default function RevealFooter({
  children,
  bgClassName = "bg-black",
  parallaxRatio = 0.6,
  breakpoint = 768,
}: RevealFooterProps) {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReveal(wide.matches && !reduce.matches);
    apply();
    wide.addEventListener("change", apply);
    reduce.addEventListener("change", apply);
    return () => {
      wide.removeEventListener("change", apply);
      reduce.removeEventListener("change", apply);
    };
  }, [breakpoint]);

  if (!reveal) return <>{children}</>;

  return (
    <RevealFooterInner bgClassName={bgClassName} parallaxRatio={parallaxRatio}>
      {children}
    </RevealFooterInner>
  );
}

function RevealFooterInner({
  children,
  bgClassName,
  parallaxRatio,
}: {
  children: ReactNode;
  bgClassName: string;
  parallaxRatio: number;
}) {
  const [spacerHeight, setSpacerHeight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const footerHeightRef = useRef(0);

  // Strefa odsłaniania = wysokość stopki (sekcja zjeżdża dokładnie o tyle).
  // Musi równać się wysokości stopki — przy dłuższej sekcja zjeżdża ponad górę
  // kontenera i wraca luka w tle.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const fh = el.offsetHeight;
      footerHeightRef.current = fh;
      setSpacerHeight(fh);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const update = useCallback(() => {
    const spacer = spacerRef.current;
    const inner = innerRef.current;
    const fh = footerHeightRef.current;
    if (!spacer || !inner || !fh) return;

    const vh = window.innerHeight;
    // 0, gdy góra spacera dotyka dołu viewportu; 1, gdy stopka w pełni odsłonięta.
    const progress = Math.min(
      Math.max((vh - spacer.getBoundingClientRect().top) / fh, 0),
      1,
    );
    // Treść stopki dryfuje w górę wolniej niż sekcja (sekcja przejeżdża fh,
    // stopka tylko fh × parallaxRatio).
    inner.style.transform = `translate3d(0, ${(1 - progress) * fh * parallaxRatio}px, 0)`;
  }, [parallaxRatio]);

  // Lenis ma wirtualny scroll i nie emituje natywnego `scroll` — sterujemy
  // przez `useLenis` (inaczej `useScroll`/`window.onscroll` się nie aktualizują).
  useLenis(update);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, spacerHeight]);

  return (
    <>
      {/* Strefa odsłaniania — scroll, przez który sekcja zsuwa się ze stopki. */}
      <div ref={spacerRef} aria-hidden style={{ height: spacerHeight }} />

      {/* Przypięty kontener z tłem stopki — wypełnia odsłanianą strefę (bez luki).
          Zawartość stopki dryfuje w nim wolnym parallaxem. */}
      <div
        ref={wrapRef}
        className={`fixed inset-x-0 bottom-0 z-0 overflow-hidden ${bgClassName}`}
      >
        <div ref={innerRef} className="will-change-transform">
          {children}
        </div>
      </div>
    </>
  );
}
