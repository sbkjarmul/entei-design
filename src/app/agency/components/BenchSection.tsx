import { getTranslations } from "next-intl/server";

import TextReveal from "@/components/TextReveal";

export default async function BenchSection() {
  const t = await getTranslations("agency.bench");

  return (
    <section className="flex min-h-(--section-h-md) flex-col justify-center gap-6 bg-primary p-4 text-ink md:px-16 md:min-h-(--section-h-lg)">
      <TextReveal
        as="h2"
        trigger="inView"
        mask={false}
        className="t-title-xl max-w-[773px] font-semibold leading-display"
      >
        {t("title")}
      </TextReveal>
      <TextReveal
        as="p"
        trigger="inView"
        mask={false}
        delay={0.15}
        className="t-lead max-w-[749px]"
      >
        {t("subtitle")}
      </TextReveal>
    </section>
  );
}
