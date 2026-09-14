import { getTranslations } from "next-intl/server";

import FaqList, { type FaqItem } from "./FaqList";

const FAQ_IDS = ["guarantee", "contract", "budget"] as const;

export default async function FaqSection() {
  const t = await getTranslations("agency.faq");

  const items: FaqItem[] = FAQ_IDS.map((id) => ({
    id,
    question: t(`items.${id}.question`),
    answer: t(`items.${id}.answer`),
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  // Desktop: heading in the left column, questions in the right one.
  return (
    <section className="flex flex-col justify-center gap-8 bg-concrete px-4 py-16 md:grid md:min-h-(--section-h-lg) md:grid-cols-2 md:content-center md:items-start md:gap-16 md:px-16 md:py-4">
      <h2 className="t-title-lg text-black">{t("title")}</h2>
      <FaqList items={items} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
