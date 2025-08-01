import type { Metadata } from "next";
import PortfolioHeader from "./components/portfolio-header";

export const metadata: Metadata = {
  title: "Portfolio UI/UX | Sebastian Jarmul",
  description:
    "UI/UX design portfolio of Sebastian Jarmul, a designer and developer based in Dublin, Ireland | ENTEI Design",
  keywords: [
    "UI/UX design",
    "portfolio",
    "branding",
    "web design",
    "mobile apps",
    "SaaS",
    "Sebastian Jarmul",
  ],
};

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <PortfolioHeader />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
