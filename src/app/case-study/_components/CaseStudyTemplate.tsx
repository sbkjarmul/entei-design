import { getTranslations } from "next-intl/server";
import Image from "next/image";

import type { CaseImage, CaseStudy, ProseBlock } from "@/lib/caseStudies";

import LatestWorks from "./LatestWorks";
import CaseStudyCta from "./CaseStudyCta";

/**
 * Data-driven case study template. Page structure mirrors berrielbrands.com
 * „works": hero (title left / intro right) → full-bleed feature image →
 * two-column body (sticky metadata + prose & pull-quotes) → full-bleed gallery
 * → latest works → CTA. Server component: copy comes from next-intl messages
 * (`caseStudy.<i18nKey>` per project + shared `caseStudyChrome`).
 */
export default async function CaseStudyTemplate({ data }: { data: CaseStudy }) {
  const t = await getTranslations(`caseStudy.${data.i18nKey}`);
  const tc = await getTranslations("caseStudyChrome");

  const meta = [
    {
      label: tc("services"),
      value: (data.servicesKeys ?? [])
        .map((k) => tc(`serviceValues.${k}`))
        .join(", "),
    },
    data.industryKey && {
      label: tc("industry"),
      value: tc(`industryValues.${data.industryKey}`),
    },
    data.year && { label: tc("year"), value: String(data.year) },
    { label: tc("country"), value: tc(`countryValues.${data.countryKey}`) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article className="bg-white text-gray-900">
      {/* ---- Hero: title (left) + intro (right) ---- */}
      <div className="px-6 pb-14 pt-[140px] md:px-12 md:pb-24 md:pt-[220px]">
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
          <h1 className="font-neue-haas text-7xl font-medium lowercase leading-none tracking-tight first-letter:uppercase md:text-9xl">
            {t("title")}
          </h1>
          <p className="text-2xl leading-tight tracking-normal text-gray-900 md:text-4xl">
            {t("intro")}
          </p>
        </div>
      </div>

      {/* ---- Feature image ---- */}
      {data.featureImage && (
        <div className="px-6 md:px-12">
          <GalleryImage image={data.featureImage} priority />
        </div>
      )}

      {/* ---- Body: sticky metadata (left) + prose (right), equal columns ---- */}
      <div className="px-6 py-16 md:px-12 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <aside className="h-fit self-start md:sticky md:top-28">
            <dl className="flex flex-col text-xs uppercase tracking-wide md:text-sm">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="flex items-baseline justify-between gap-4 border-t border-gray-300 py-4 last:border-b"
                >
                  <dt className="text-gray-500">{m.label}</dt>
                  <dd className="text-right text-gray-900">{m.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="flex flex-col gap-8 md:gap-12">
            {data.body?.map((block, i) => (
              <ProseRenderer
                key={i}
                block={block}
                t={t}
                fileUnderLabel={tc("fileUnder")}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---- Gallery: stacked; `full` images are edge-to-edge, full height ---- */}
      {data.gallery && data.gallery.length > 0 && (
        <div className="flex flex-col gap-4 md:gap-6">
          {data.gallery.map((img) =>
            img.full ? (
              <FullScreenImage key={img.src} image={img} />
            ) : (
              <div key={img.src} className="px-6 md:px-12">
                <GalleryImage image={img} />
              </div>
            ),
          )}
        </div>
      )}

      <LatestWorks currentSlug={data.slug} heading={tc("latestWorks")} />

      <CaseStudyCta
        cta={tc("cta")}
        liveUrl={data.liveUrl}
        viewLive={tc("viewLive")}
      />
    </article>
  );
}

type T = Awaited<ReturnType<typeof getTranslations>>;

function ProseRenderer({
  block,
  t,
  fileUnderLabel,
}: {
  block: ProseBlock;
  t: T;
  fileUnderLabel: string;
}) {
  switch (block.type) {
    case "text":
      return (
        <p className="text-xl leading-snug tracking-normal text-gray-900 md:text-2xl">
          {t(`${block.k}.body`)}
        </p>
      );

    case "quote":
      return (
        <blockquote className="text-3xl font-medium leading-tight tracking-normal text-gray-900 md:text-4xl">
          {`“${t(`quote.${block.k}`)}”`}
        </blockquote>
      );

    case "details": {
      const items = t.raw(`details.${block.k}.items`) as string[];
      return (
        <div className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-wide text-gray-500 md:text-sm">
            {t(`details.${block.k}.heading`)}
          </h2>
          <ul className="flex flex-col gap-3">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-lg leading-snug text-gray-700 md:text-xl"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "fileUnder": {
      const tags = t.raw(block.k) as string[];
      return (
        <div className="flex flex-col gap-3">
          <h2 className="text-xs uppercase tracking-wide text-gray-500 md:text-sm">
            {fileUnderLabel}
          </h2>
          <p className="text-lg leading-snug text-gray-500 md:text-xl">
            {tags.join(", ")}
          </p>
        </div>
      );
    }

    default:
      return null;
  }
}

/** Edge-to-edge image filling the full viewport width and height (cover). */
function FullScreenImage({ image }: { image: CaseImage }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}

/** Full-width image that keeps its natural proportions, with rounded corners. */
function GalleryImage({
  image,
  priority,
}: {
  image: CaseImage;
  priority?: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl">
      <Image
        src={image.src}
        alt={image.alt}
        width={0}
        height={0}
        sizes="100vw"
        priority={priority}
        className="h-auto w-full rounded-2xl md:rounded-3xl"
      />
    </div>
  );
}
