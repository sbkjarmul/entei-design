import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import TextReveal from "@/components/TextReveal";

import AgencyHeader from "./AgencyHeader";
import CalendlyButton from "./CalendlyButton";
import HighlightUnderline from "./HighlightUnderline";
import LogoMarquee from "./LogoMarquee";

export default async function HeroSection() {
  const t = await getTranslations("agency.hero");
  const tCta = await getTranslations("agency.cta");

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

  // 10px short of the viewport so the red section below peeks in.
  return (
    <section className="flex min-h-[calc(100svh-10px)] flex-col bg-concrete pb-4 text-ink">
      <AgencyHeader />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16 text-center md:py-10">
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
          {t("subtitle")}
        </TextReveal>

        <TextReveal mask={false} delay={0.4}>
          <CalendlyButton variant="dark" withSignal label={tCta("label")} />
        </TextReveal>

        <LogoMarquee label={t("logosLabel")} />
      </div>
    </section>
  );
}
