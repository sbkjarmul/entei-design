import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import TextReveal from "@/components/TextReveal";
import { CONTACT_EMAIL } from "@/lib/agency";
import { CALENDLY_URL } from "@/lib/caseStudies";

import CalendlyButton from "./CalendlyButton";
import SignalDot from "./SignalDot";

/**
 * Closing CTA card: headline + "book a call" with a direct Calendly link.
 * Desktop follows Figma 693:24; mobile is a compact card with a shorter
 * headline, a softer radial card and an email fallback.
 */
export default async function ClosingSection() {
  const t = await getTranslations("agency");

  return (
    <section className="flex bg-concrete px-4 py-10 md:min-h-(--section-h-lg) md:items-center md:px-16 md:py-4">
      <div className="relative flex flex-1 flex-col items-center justify-center gap-10 rounded-2xl bg-radial-[at_50%_45%] from-gray-900 via-gray-950 to-black px-4 py-16 md:h-[732px] md:gap-8 md:rounded-3xl md:bg-none md:bg-graphite md:px-4 md:py-0">
        <Image
          src="/images/agency/entei-wordmark-white.svg"
          alt={t("logoAlt")}
          width={96}
          height={20}
          className="absolute top-9 left-9 hidden md:block"
        />

        {/* Mobile: short headline with a red accent. */}
        <TextReveal
          as="h2"
          trigger="inView"
          mask={false}
          className="t-headline text-center text-white md:hidden"
        >
          {t.rich("closing.titleShort", {
            accent: (chunks: ReactNode) => (
              <span className="text-primary">{chunks}</span>
            ),
          })}
        </TextReveal>
        <TextReveal
          as="h2"
          trigger="inView"
          mask={false}
          className="t-headline hidden max-w-[902px] text-center text-white md:block"
        >
          {t("closing.title")}
        </TextReveal>

        <div className="flex flex-col items-center gap-4 md:gap-2">
          <CalendlyButton variant="primary" label={t("cta.label")} />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="t-caption flex items-center gap-2.5 font-medium tracking-normal text-white underline-offset-4 hover:underline"
          >
            <SignalDot />
            {t("cta.availability")}
          </a>
        </div>

        <p className="t-caption font-medium tracking-normal text-gray-500 md:hidden">
          {t.rich("closing.writeUs", {
            email: () => (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-white underline underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>
            ),
          })}
        </p>
      </div>
    </section>
  );
}
