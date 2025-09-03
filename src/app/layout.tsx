import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";

export { metadata } from "./seo/metadata";

import "./globals.css";
import Script from "next/script";

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

  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/uhq3naf.css" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        {/* Travatar */}
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17222508858');
          `}
        </Script>

        <Script
          src="https://tracker.travatar.ai/prod/latest/_ua-parser.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://tracker.travatar.ai/prod/latest/_ifvisible.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://tracker.travatar.ai/prod/latest/_md.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://tracker.travatar.ai/prod/latest/TravatarTrackerConfig.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://tracker.travatar.ai/prod/latest/TravatarTrackerSetup.min.js"
          strategy="beforeInteractive"
        />

        <Script id="travatar-init" strategy="beforeInteractive">
          {`
            window.Travatar("newTracker", window.travatarTrackerName, window.travatarTrackerUrl, {
              appId: "ENTEI",
              discoverRootDomain: true,
              cookieSameSite: "Lax",
              encodeBase64: true,
              eventMethod: 'post',
              keepalive: true,
              contexts: {
                webPage: true,
                session: true,
                browser: true,
                performanceNavigationTiming: true,
                performanceTiming: true,
                gaCookies: true,
                geolocation: true
              },
            });
          `}
        </Script>

        <Script
          src="https://tracker.travatar.ai/prod/latest/TravatarTrackerEvents.min.js"
          strategy="beforeInteractive"
        />
      </head>

      <GoogleTagManager gtmId="GTM-W83QMK2D" />

      <body className={`font-neue-haas ${despairTime.variable}`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
