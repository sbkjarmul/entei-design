import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/uhq3naf.css" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
      </head>

      <GoogleTagManager gtmId="GTM-W83QMK2D" />

      <body className="font-neue-haas">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
