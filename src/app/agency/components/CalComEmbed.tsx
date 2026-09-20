"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import { cx } from "@/lib/utils";

/** Keeps this embed's config separate from any other Cal embed on the site. */
const NAMESPACE = "agency";

/**
 * ENTEI palette mapped onto Cal.com's embed tokens (theme.css is the source of
 * the hex values). Cal.com applies these on the free plan, so the booker sits
 * on the dark graphite surface used by the comparison cards instead of the
 * white card Calendly forces. Fonts stay theirs: the embed is an iframe.
 */
const THEME_VARS = {
  "cal-brand": "#ff2400",
  "cal-brand-emphasis": "#ff3919",
  "cal-brand-text": "#141414",
  "cal-brand-accent": "#141414",
  "cal-text": "#c2c2c2",
  "cal-text-emphasis": "#ffffff",
  "cal-text-subtle": "#9e9e9e",
  "cal-text-muted": "#757575",
  "cal-text-inverted": "#141414",
  "cal-bg": "#1c1c1c",
  "cal-bg-emphasis": "#313131",
  "cal-bg-subtle": "#262626",
  "cal-bg-muted": "#1f1f1f",
  "cal-bg-inverted": "#c2c2c2",
  "cal-border": "#313131",
  "cal-border-emphasis": "#616161",
  "cal-border-subtle": "#262626",
  "cal-border-muted": "#1f1f1f",
  radius: "8px",
};

interface CalComEmbedProps {
  /** Booking link as `user/event-type`, e.g. `entei/15min`. */
  calLink: string;
  /** Accessible name of the booking region. */
  label: string;
  /** Text before the fallback link (shown when the embed can't load). */
  fallbackPrefix: string;
  /** Label of the fallback link to the booking page. */
  fallbackLink: string;
  className?: string;
}

/** Inline Cal.com booker, themed with the brand tokens. */
export default function CalComEmbed({
  calLink,
  label,
  fallbackPrefix,
  fallbackLink,
  className,
}: CalComEmbedProps) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: true,
        layout: "month_view",
        cssVarsPerTheme: { light: THEME_VARS, dark: THEME_VARS },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={cx("flex w-full flex-col items-center gap-4", className)}>
      <div
        role="region"
        aria-label={label}
        // Desktop: the booker sizes itself. Mobile: cap it so the slot list
        // scrolls inside the card instead of stretching the page.
        className="max-h-[820px] w-full max-w-[1100px] overflow-y-auto md:max-h-none md:overflow-visible"
      >
        <Cal
          namespace={NAMESPACE}
          calLink={calLink}
          config={{ layout: "month_view", theme: "dark" }}
          style={{ width: "100%", height: "auto", overflow: "hidden" }}
        />
      </div>

      {/* Ad blockers and script errors must not cost us the lead. */}
      {/* font-medium: the Typekit kit has no 400, which falls back to Helvetica. */}
      <p className="t-body font-medium tracking-normal text-graphite">
        {fallbackPrefix}{" "}
        <a
          href={`https://cal.com/${calLink}`}
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
