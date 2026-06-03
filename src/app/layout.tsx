import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import { getLocale, getMessages } from "next-intl/server";

export { metadata } from "./seo/metadata";

import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import { ConsentProvider } from "@/components/CookieConsent/ConsentProvider";
import AnalyticsScripts from "@/components/CookieConsent/AnalyticsScripts";
import CookieConsentBanner from "@/components/CookieConsent/CookieConsentBanner";
import LocalBusinessSchema from "@/components/StructuredData/LocalBusinessSchema";

const despairTime = localFont({
  src: "../../public/fonts/despair-time-straight.otf",
  variable: "--font-despair-time",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/uhq3naf.css" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/images/entei-favicon.svg"
        />
        <link rel="alternate icon" href="/images/entei-favicon.png" />

        {/* Local SEO — geographic targeting for Stalowa Wola */}
        <meta name="geo.region" content="PL-18" />
        <meta name="geo.placename" content="Stalowa Wola" />
        <meta name="geo.position" content="50.5826;22.0537" />
        <meta name="ICBM" content="50.5826, 22.0537" />

        {/* Meta domain verification — static meta tag, no tracking */}
        <meta
          name="facebook-domain-verification"
          content="e5mbgpsv046wxdji7oad26ckdfnv7a"
        />

        <LocalBusinessSchema />
      </head>

      <body className={`font-neue-haas ${despairTime.variable}`}>
        <ConsentProvider>
          <NextIntlClientProvider messages={{ portfolio: messages.portfolio }}>
            {children}
          </NextIntlClientProvider>

          {/* Tracking scripts — loaded only after cookie consent is granted */}
          <AnalyticsScripts />
          <CookieConsentBanner />

          {/* Vercel Analytics — cookieless, no consent required */}
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
