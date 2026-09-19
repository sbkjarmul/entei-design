import Image from "next/image";
import { getTranslations } from "next-intl/server";

import CalendlyButton from "./CalendlyButton";

export default async function AgencyHeader() {
  const t = await getTranslations("agency");

  return (
    <header className="flex w-full items-start justify-between p-4">
      <Image
        src="/images/agency/entei-wordmark-ink.svg"
        alt={t("logoAlt")}
        width={96}
        height={20}
        priority
        className="shrink-0"
      />
      <CalendlyButton
        variant="dark"
        withSignal
        label={t("cta.label")}
        shortLabel={t("cta.labelShort")}
      />
    </header>
  );
}
