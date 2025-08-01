import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ENTEI | Agencja Kreatywna",
  description:
    "Agencja kreatywna, która zajmuje się tworzeniem brandingu, stron internetowych oraz strategii marketingowych.",
  keywords: [
    "Projektowanie logo",
    "Stalowa Wola",
    "Agencja kreatywna",
    "Projektowanie stron",
    "Projektowanie stron internetowych",
    "Projektowanie stron internetowych Stalowa Wola",
    "Projektowanie stron dla firm",
  ],
};

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(to bottom, transparent 0%, transparent 75%, rgba(0, 0, 0, 1) 100%)",
      }}
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
