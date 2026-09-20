import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import TextReveal from "@/components/TextReveal";

import AgencyHeader from "./AgencyHeader";
import HighlightUnderline from "./HighlightUnderline";
import LogoMarquee from "./LogoMarquee";

interface BookingSectionProps {
  /** Booking calendar rendered in place of the hero's CTA button. */
  calendar: ReactNode;
}

/**
 * Booking landing (/agency/rozmowa): the hero of the agency landing with a
 * booking calendar embedded in place of the CTA button.
 */
export default async function BookingSection({
  calendar,
}: BookingSectionProps) {
  const t = await getTranslations("agency.hero");
  const tb = await getTranslations("agency.booking");

  const rich = {
    strong: (chunks: ReactNode) => (
      <strong className="font-bold">{chunks}</strong>
    ),
    mark: (chunks: ReactNode) => (
      <HighlightUnderline>
        <span className="font-semibold">{chunks}</span>
      </HighlightUnderline>
    ),
    em: (chunks: ReactNode) => <em className="italic">{chunks}</em>,
    // Keeps a one-letter word with its phrase (no "w" orphan at a line end).
    nowrap: (chunks: ReactNode) => (
      <span className="whitespace-nowrap">{chunks}</span>
    ),
  };

  return (
    <section className="flex min-h-svh flex-col bg-concrete pb-4 text-ink">
      {/* The calendar is the CTA here, so the header keeps only the logo. */}
      <AgencyHeader withCta={false} />

      <div className="flex flex-1 flex-col items-center gap-8 px-4 py-10 text-center md:py-16">
        <TextReveal
          as="h1"
          mask={false}
          className="t-title-xl max-w-[900px]"
          lines={[t("line1"), t.rich("line2", rich), t.rich("line3", rich)]}
        />

        <TextReveal
          as="p"
          mask={false}
          delay={0.3}
          className="t-lead-sm max-w-[506px]"
        >
          {tb("subtitle")}
        </TextReveal>

        {calendar}

        <LogoMarquee label={t("logosLabel")} />
      </div>
    </section>
  );
}
