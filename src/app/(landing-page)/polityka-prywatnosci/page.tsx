import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Polityka prywatności | ENTEI",
  description:
    "Polityka prywatności studia kreatywnego ENTEI — dowiedz się, jakie dane zbieramy, w jakim celu je przetwarzamy oraz jakie prawa Ci przysługują.",
  alternates: {
    canonical: "https://entei.design/polityka-prywatnosci",
  },
};

export default async function PrivacyPolicyPage() {
  const t = await getTranslations({
    locale: "pl",
    namespace: "privacyPolicy",
  });

  return <LegalDocument t={t} />;
}
