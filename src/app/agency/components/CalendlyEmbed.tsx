"use client";

import Script from "next/script";

import { CALENDLY_URL } from "@/lib/caseStudies";
import { cx } from "@/lib/utils";

/** Official inline-embed loader (no extra CSS needed for the inline widget). */
const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Brand colors for the widget (hex without `#`). Calendly ignores them on free
 * plans, so the embed then falls back to its own white theme — still usable.
 */
const EMBED_PARAMS = new URLSearchParams({
  hide_gdpr_banner: "1",
  background_color: "c2c2c2",
  text_color: "141414",
  primary_color: "ff2400",
});

interface CalendlyEmbedProps {
  /** Accessible name of the booking region. */
  label: string;
  /** Text before the fallback link (shown when the widget can't load). */
  fallbackPrefix: string;
  /** Label of the fallback link to the Calendly page. */
  fallbackLink: string;
  className?: string;
}

/**
 * Inline Calendly booking calendar — the lead form of the booking landing.
 * The widget is an iframe injected by Calendly's script; if an ad blocker or a
 * script error stops it, the fallback link below still opens the booking page.
 */
export default function CalendlyEmbed({
  label,
  fallbackPrefix,
  fallbackLink,
  className,
}: CalendlyEmbedProps) {
  const url = `${CALENDLY_URL}?${EMBED_PARAMS}`;

  return (
    <div className={cx("flex w-full flex-col items-center gap-4", className)}>
      {/* `data-resize` lets Calendly grow the iframe with its own content
          (date list, form), so nothing scrolls inside the embed on mobile. */}
      <div
        role="region"
        aria-label={label}
        data-url={url}
        data-resize="true"
        className="calendly-inline-widget h-[860px] w-full max-w-[1040px] overflow-hidden rounded-2xl md:h-[700px]"
      />
      <Script src={WIDGET_SRC} strategy="afterInteractive" />

      <p className="t-caption text-graphite">
        {fallbackPrefix}{" "}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-ink"
        >
          {fallbackLink}
        </a>
      </p>
    </div>
  );
}
