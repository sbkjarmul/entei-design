import Link from "next/link";
import { getTranslations } from "next-intl/server";

import PortfolioCard from "@/components/PortfolioCard";
import { getOtherCaseStudies } from "@/lib/caseStudies";

/**
 * „Latest works" — tile grid of the other case studies (registry-driven),
 * mirroring the berrielbrands works grid: each tile shows the project image and
 * reveals its name + country on hover. Links use each project's canonical href
 * (internal case study or external site).
 */
export default async function LatestWorks({
  currentSlug,
  heading,
}: {
  currentSlug: string;
  heading: string;
}) {
  const tc = await getTranslations("caseStudyChrome");
  const others = getOtherCaseStudies(currentSlug).filter((c) => c.card?.image);

  if (others.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 px-6 pt-20 md:px-12 md:pt-28">
      <h2 className="text-[20px] font-medium text-gray-900 first-letter:uppercase">
        {heading}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((c) => (
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
  );
}
