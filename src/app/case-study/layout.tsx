import CaseStudyHeader from "./components/case-study-header";

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <CaseStudyHeader />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
