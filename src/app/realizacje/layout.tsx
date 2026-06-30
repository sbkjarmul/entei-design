import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import RevealFooter from "@/components/RevealFooter";
import CaseStudyFooter from "../case-study/components/case-study-footer";
import WorksHeader from "./components/works-header";

export const metadata: Metadata = {
  title: "Nasze realizacje | ENTEI Design",
  description:
    "Systemy wizerunkowe oraz strony internetowe dla ambitnych founderów, którzy nie chcą zniknąć w tłumie.",
};

export default async function WorksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tc = await getTranslations("caseStudyChrome");

  return (
    <>
      {/* Warstwa treści — nieprzezroczysta i nad szarą stopką (z-30), zsuwa się
          po niej w pełnej prędkości scrolla. */}
      <div className="relative z-30 flex min-h-screen flex-col bg-white">
        <WorksHeader wantProject={tc("wantProject")} />
        <main className="flex-grow">{children}</main>
      </div>
      <RevealFooter bgClassName="bg-gray-300">
        <CaseStudyFooter />
      </RevealFooter>
    </>
  );
}
