import Image from "next/image";
import { getTranslations } from "next-intl/server";

import TextReveal from "@/components/TextReveal";

import CalendlyButton from "./CalendlyButton";
import SignalDot from "./SignalDot";

export default async function MeetSection() {
  const t = await getTranslations("agency");

  return (
    <section className="flex flex-col gap-10 bg-concrete px-4 py-10 md:min-h-(--section-h-lg) md:flex-row md:items-center md:gap-16 md:py-4">
      <div className="relative flex min-h-110 w-full flex-col items-center justify-center gap-8 rounded-3xl bg-graphite px-4 py-24 md:h-[546px] md:w-[550px] md:shrink-0 md:py-0">
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
          className="t-title-xl text-center tracking-loose text-white"
        >
          {t("meet.title")}
        </TextReveal>

        <div className="flex flex-col items-center gap-2">
          <CalendlyButton variant="primary" label={t("cta.label")} />
          <p className="t-caption flex items-center gap-2.5 font-medium tracking-normal text-white">
            <SignalDot />
            {t("cta.availability")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:w-[527px]">
        <TextReveal
          as="p"
          trigger="inView"
          mask={false}
          className="t-title-lg text-black"
          lines={[t("meet.introLine1"), t("meet.introLine2")]}
          stagger={0.06}
        />
        <TextReveal
          as="p"
          trigger="inView"
          mask={false}
          delay={0.15}
          className="t-lead-sm text-ink"
        >
          {t("meet.body")}
        </TextReveal>
      </div>
    </section>
  );
}
