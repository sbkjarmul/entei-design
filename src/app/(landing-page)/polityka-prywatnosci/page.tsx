import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import AccentText from "@/components/AccentText";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: "Polityka prywatności | ENTEI",
  description:
    "Polityka prywatności studia kreatywnego ENTEI — dowiedz się, jakie dane zbieramy, w jakim celu je przetwarzamy oraz jakie prawa Ci przysługują.",
  alternates: {
    canonical: "https://entei.design/polityka-prywatnosci",
  },
};

interface PolicyTable {
  columns: string[];
  rows: string[][];
}

interface PolicySection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  table?: PolicyTable;
}

function Divider() {
  return <div className="border border-solid border-gray-800" />;
}

function PolicyTableView({ table }: { table: PolicyTable }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th
                key={column}
                className="border border-gray-800 bg-gray-900 p-3 text-left font-medium text-gray-200"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-800 p-3 align-top text-gray-400"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations({
    locale: "pl",
    namespace: "privacyPolicy",
  });

  const sections = t.raw("sections") as PolicySection[];

  return (
    <div className="flex w-full min-h-fit flex-col items-center gap-10 p-0 md:py-8">
      <Container className="flex flex-col gap-10 px-4">
        <section className="my-12 flex max-w-3xl flex-col gap-6 md:my-20">
          <AccentText>{t("header.badge")}</AccentText>
          <Heading level={1} className="leading-tight">
            <span className="text-gray-500">{t("header.titleLight")} </span>
            <span className="font-medium text-gray-100">
              {t("header.titleStrong")}
            </span>
          </Heading>
          <p className="text-base leading-relaxed text-gray-400">
            {t("header.intro")}
          </p>
          <span className="text-sm text-gray-600">
            {t("header.lastUpdated")}
          </span>
        </section>

        <Divider />

        <nav
          aria-label={t("tocTitle")}
          className="flex flex-col gap-3 md:max-w-2xl"
        >
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-600">
            {t("tocTitle")}
          </h2>
          <ol className="flex flex-col gap-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-gray-500 transition-colors hover:text-primary"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <Divider />

        <div className="flex flex-col gap-12 pb-8">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="flex scroll-mt-28 flex-col gap-4"
            >
              <Heading level={2} className="text-2xl md:text-3xl text-gray-100">
                {section.title}
              </Heading>

              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-3xl text-base leading-relaxed text-gray-400"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="flex max-w-3xl flex-col gap-2 pl-5 text-base leading-relaxed text-gray-400 marker:text-primary [list-style-type:disc]">
                  {section.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              )}

              {section.table && <PolicyTableView table={section.table} />}
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
