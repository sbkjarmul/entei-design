import { getTranslations } from "next-intl/server";

import WorksGrid, { type WorkItem } from "@/components/WorksGrid";
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

  const items: WorkItem[] = others.map((c) => ({
    slug: c.slug,
    name: c.name,
    image: c.card!.image,
    country: tc(`countryValues.${c.countryKey}`),
    href: c.href,
    target: c.href.startsWith("http") ? "_blank" : undefined,
  }));

  return (
    <div className="flex flex-col gap-6 px-6 pt-20 md:px-12 md:pt-28">
      <h2 className="text-[20px] font-medium text-gray-900 first-letter:uppercase">
        {heading}
      </h2>
      <WorksGrid items={items} />
    </div>
  );
}
