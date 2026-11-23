import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import LegalDocument from "@/components/LegalDocument";
import { MAIN_SITE_URL } from "@/lib/agency";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({
    locale: "pl",
    namespace: "legal.terms.meta",
  });
  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: { canonical: `${MAIN_SITE_URL}/regulamin` },
  };
}

export default async function TermsPage() {
  const t = await getTranslations({ locale: "pl", namespace: "legal.terms" });
  return <LegalDocument t={t} />;
}
