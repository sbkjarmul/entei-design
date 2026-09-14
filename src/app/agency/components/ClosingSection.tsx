import Image from "next/image";
import { getTranslations } from "next-intl/server";

import TextReveal from "@/components/TextReveal";
import { CALENDLY_URL } from "@/lib/caseStudies";

import CalendlyButton from "./CalendlyButton";
import SignalDot from "./SignalDot";

/** Closing CTA card: headline + "book a call" with a direct Calendly link. */
export default async function ClosingSection() {
  const t = await getTranslations("agency");

  return (
    <section className="flex bg-concrete px-4 py-10 md:min-h-(--section-h-lg) md:items-center md:px-16 md:py-4">
      <div className="relative flex min-h-150 flex-1 flex-col items-center justify-center gap-8 rounded-3xl bg-graphite px-4 py-24 md:h-[732px] md:py-0">
        <Image
          src="/images/agency/entei-wordmark-white.svg"
          alt={t("logoAlt")}
          width={96}
          height={20}
          className="absolute top-9 left-9"
        />

        <TextReveal
          as="h2"
          trigger="inView"
          mask={false}
          className="t-headline max-w-[902px] text-center text-white"
        >
          {t("closing.title")}
        </TextReveal>

        <div className="flex flex-col items-center gap-2">
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
      </div>
    </section>
  );
}
