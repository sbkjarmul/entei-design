import { getTranslations } from "next-intl/server";

import BenchTypewriter from "./BenchTypewriter";

export default async function BenchSection() {
  const t = await getTranslations("agency.bench");

  return (
    <section className="bg-primary text-ink">
      <BenchTypewriter title={t("title")} subtitle={t("subtitle")} />
    </section>
  );
}
