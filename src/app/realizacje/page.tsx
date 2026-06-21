import Link from "next/link";
import { getTranslations } from "next-intl/server";

import PortfolioCard from "@/components/PortfolioCard";
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
  const projects = CASE_STUDIES.filter((c) => c.card?.image);

  return (
    <article className="bg-white text-gray-900">
      {/* ---- Hero: title + description + CTA ---- */}
      <div className="px-6 pb-14 pt-[140px] md:px-12 md:pb-24 md:pt-[220px]">
        <h1 className="font-neue-haas text-7xl font-medium leading-none tracking-tight md:text-9xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-3xl text-2xl leading-tight tracking-normal text-gray-500 md:mt-8 md:text-4xl">
          {t("description")}
        </p>
        <Link
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="t-h4 mt-8 inline-block w-fit font-medium text-gray-900 underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70 md:mt-10"
        >
          {t("cta")}
        </Link>
      </div>

      {/* ---- Tile grid ---- */}
      <div className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((c) => (
            <Link
              key={c.slug}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              className="w-full"
            >
              <PortfolioCard
                name={c.name}
                image={c.card!.image}
                country={tc(`countryValues.${c.countryKey}`)}
              />
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
