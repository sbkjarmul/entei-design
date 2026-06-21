import type { Metadata } from "next";

import CaseStudyFooter from "../case-study/components/case-study-footer";
import CaseStudyHeader from "../case-study/components/case-study-header";

export const metadata: Metadata = {
  title: "Nasze realizacje | ENTEI Design",
  description:
    "Systemy wizerunkowe oraz strony internetowe dla ambitnych founderów, którzy nie chcą zniknąć w tłumie.",
};

export default function WorksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <CaseStudyHeader />
      <main className="flex-grow">{children}</main>
      <CaseStudyFooter />
    </div>
  );
}
