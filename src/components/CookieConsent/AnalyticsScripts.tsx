"use client";

import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

import FacebookPixel from "@/components/FacebookPixel";
import { useConsent } from "./ConsentProvider";

/**
 * Renders all non-essential tracking scripts (Google, Meta, Travatar) only
 * after the user has granted cookie consent. Until then nothing is loaded.
 */
export default function AnalyticsScripts() {
  const { consent } = useConsent();

  if (consent !== "granted") {
    return null;
  }

  return (
    <>
      {/* Google Ads conversion tracking */}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17222508858');
        `}
      </Script>

      {/* Travatar — loaded sequentially to preserve the required script order */}
      <Script id="travatar-loader" strategy="afterInteractive">
        {`
          (function () {
            var base = "https://tracker.travatar.ai/prod/latest/";
            var scripts = [
              "_ua-parser.min.js",
              "_ifvisible.min.js",
              "_md.min.js",
              "TravatarTrackerConfig.min.js",
              "TravatarTrackerSetup.min.js"
            ];
            function loadSequentially(index, done) {
              if (index >= scripts.length) { done(); return; }
              var el = document.createElement("script");
              el.src = base + scripts[index];
              el.onload = function () { loadSequentially(index + 1, done); };
              document.head.appendChild(el);
            }
            loadSequentially(0, function () {
              window.Travatar(
                "newTracker",
                window.travatarTrackerName,
                window.travatarTrackerUrl,
                {
                  appId: "ENTEI",
                  discoverRootDomain: true,
                  cookieSameSite: "Lax",
                  encodeBase64: true,
                  eventMethod: "post",
                  keepalive: true,
                  contexts: {
                    webPage: true,
                    session: true,
                    browser: true,
                    performanceNavigationTiming: true,
                    performanceTiming: true,
                    gaCookies: true,
                    geolocation: true
                  }
                }
              );
              var events = document.createElement("script");
              events.src = base + "TravatarTrackerEvents.min.js";
              document.head.appendChild(events);
            });
          })();
        `}
      </Script>

      {/* Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-W83QMK2D" />

      {/* Meta (Facebook) Pixel */}
      <FacebookPixel />
    </>
  );
}
