import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import LegalDocument from "@/components/LegalDocument";
import { MAIN_SITE_URL } from "@/lib/agency";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({
    locale: "pl",
    namespace: "legal.purchase.meta",
  });
  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: { canonical: `${MAIN_SITE_URL}/zasady-zakupow` },
  };
}

export default async function PurchaseInfoPage() {
  const t = await getTranslations({
    locale: "pl",
    namespace: "legal.purchase",
  });
  return <LegalDocument t={t} />;
}
