import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import TextReveal from "@/components/TextReveal";
import { CONTACT_EMAIL } from "@/lib/agency";
import { CALENDLY_URL } from "@/lib/caseStudies";

import CalendlyButton from "./CalendlyButton";
import SignalDot from "./SignalDot";

const accent = (chunks: ReactNode) => (
  <span className="text-primary">{chunks}</span>
);

/**
 * Closing CTA card: radial dark card with a headline ("regularne projekty" in
 * brand red), a direct Calendly button and an email fallback. Same component
 * on every breakpoint; mobile gets the shorter headline.
 */
export default async function ClosingSection() {
  const t = await getTranslations("agency");

  return (
    <section className="flex bg-concrete px-4 py-10 md:min-h-(--section-h-lg) md:items-center md:px-16 md:py-4">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 rounded-2xl bg-radial-[at_50%_45%] from-gray-900 via-gray-950 to-black px-4 py-16 md:rounded-3xl md:px-16 md:py-24">
        <TextReveal
          as="h2"
          trigger="inView"
          mask={false}
          className="t-headline text-center text-white md:hidden"
        >
          {t.rich("closing.titleShort", { accent })}
        </TextReveal>
        <TextReveal
          as="h2"
          trigger="inView"
          mask={false}
          className="t-headline hidden max-w-[902px] text-center text-white md:block"
        >
          {t.rich("closing.title", { accent })}
        </TextReveal>

        <div className="flex flex-col items-center gap-4">
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

        <p className="t-caption font-medium tracking-normal text-gray-500">
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
