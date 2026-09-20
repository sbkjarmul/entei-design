"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import { cx } from "@/lib/utils";

/** Keeps this embed's config separate from any other Cal embed on the site. */
const NAMESPACE = "agency";

/**
 * ENTEI palette mapped onto Cal.com's embed tokens (theme.css is the source of
 * the hex values). Unlike Calendly, Cal.com applies these on the free plan, so
 * the booker can sit on the dark graphite surface used by the comparison cards.
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
  /** Booking link as `user/event-type`, e.g. `entei/30min`. */
  calLink: string;
  className?: string;
}

/** Inline Cal.com booker, styled with the brand tokens (free-plan friendly). */
export default function CalComEmbed({ calLink, className }: CalComEmbedProps) {
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
    <div
      className={cx(
        // Desktop: the booker sizes itself. Mobile: cap it so the slot list
        // scrolls inside the card instead of stretching the page.
        "max-h-[820px] w-full max-w-[1100px] overflow-y-auto md:max-h-none md:overflow-visible",
        className,
      )}
    >
      <Cal
        namespace={NAMESPACE}
        calLink={calLink}
        config={{ layout: "month_view", theme: "dark" }}
        style={{ width: "100%", height: "auto", overflow: "hidden" }}
      />
    </div>
  );
}
