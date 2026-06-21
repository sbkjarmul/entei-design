import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import {
  getCaseStudy,
  getTemplateSlugs,
} from "@/lib/caseStudies";
import CaseStudyTemplate from "../_components/CaseStudyTemplate";

export function generateStaticParams() {
  return getTemplateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs?.i18nKey) return {};

  const t = await getTranslations(`caseStudy.${cs.i18nKey}`);
  const title = `${cs.name} Case Study | Entei Design`;
  const description = t("intro");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: cs.card?.image ? [cs.card.image] : undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs?.body?.length) notFound();

  return <CaseStudyTemplate data={cs} />;
}
