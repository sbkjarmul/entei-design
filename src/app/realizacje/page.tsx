import Link from "next/link";
import { getTranslations } from "next-intl/server";

import TextReveal from "@/components/TextReveal";
import WorksGrid, { type WorkItem } from "@/components/WorksGrid";
import { CALENDLY_URL, CASE_STUDIES } from "@/lib/caseStudies";

/**
 * „Nasze realizacje" — works index. Clean light hero (title + description +
 * „let's talk" CTA) over a tile grid of every portfolio project, mirroring the
 * berrielbrands works listing. Server component: copy comes from next-intl
 * (`works` namespace + shared `caseStudyChrome`).
 */
export default async function WorksPage() {
  const t = await getTranslations("works");
  const tc = await getTranslations("caseStudyChrome");
  const items: WorkItem[] = CASE_STUDIES.filter((c) => c.card?.image).map(
    (c) => ({
      slug: c.slug,
      name: c.name,
      image: c.card!.image,
      country: tc(`countryValues.${c.countryKey}`),
      href: c.href,
      target: c.href.startsWith("http") ? "_blank" : undefined,
    }),
  );

  return (
    <article className="bg-white text-gray-900">
      {/* ---- Hero: title + description + CTA (entrance text reveal) ---- */}
      <div className="px-6 pb-14 pt-[140px] md:px-12 md:pb-24 md:pt-[220px]">
        <TextReveal
          as="h1"
          className="font-neue-haas text-7xl font-medium leading-none tracking-tight md:text-9xl"
          delay={0.1}
        >
          {t("title")}
        </TextReveal>
        <TextReveal
          as="p"
          className="mt-6 max-w-3xl text-2xl leading-tight tracking-normal text-gray-500 md:mt-8 md:text-4xl"
          delay={0.28}
        >
          {t("description")}
        </TextReveal>
        <TextReveal as="div" mask={false} delay={0.5} className="mt-8 md:mt-10">
          <Link
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="t-h4 inline-block w-fit font-medium text-gray-900 underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70"
          >
            {t("cta")}
          </Link>
        </TextReveal>
      </div>

      {/* ---- Tile grid (animated reveal) ---- */}
      <div className="px-6 pb-24 md:px-12 md:pb-32">
        <WorksGrid items={items} />
      </div>
    </article>
  );
}
