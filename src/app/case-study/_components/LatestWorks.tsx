import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getOtherCaseStudies } from "@/lib/caseStudies";

/**
 * „Latest works" — numbered list of the other case studies (registry-driven),
 * mirroring the berrielbrands works index. Links use each project's canonical
 * href (internal case study or external site).
 */
export default async function LatestWorks({
  currentSlug,
  heading,
}: {
  currentSlug: string;
  heading: string;
}) {
  const tc = await getTranslations("caseStudyChrome");
  const others = getOtherCaseStudies(currentSlug);

  if (others.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 px-6 pt-20 md:px-12 md:pt-28">
      <h2 className="t-caption uppercase tracking-wide text-gray-500">
        {heading}
      </h2>
      <ul className="flex flex-col">
        {others.map((c, i) => (
          <li key={c.slug} className="border-t border-gray-200 last:border-b">
            <Link
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              className="group flex items-baseline gap-4 py-5 transition-colors hover:text-gray-500"
            >
              <span className="t-caption w-8 shrink-0 text-gray-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="t-h3 font-normal">{c.name}</span>
              <span className="t-caption ml-auto text-gray-400">
                {tc(`countryValues.${c.countryKey}`)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
