import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "ENTEI | Agencja Kreatywna",
  description:
    "Agencja kreatywna, która zajmuje się tworzeniem brandingu, stron internetowych oraz strategii marketingowych.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/uhq3naf.css" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
      </head>

      <GoogleTagManager gtmId="GTM-W83QMK2D" />

      <body className="font-neue-haas">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
