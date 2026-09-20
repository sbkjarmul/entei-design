import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import CookieBannerOff from "@/components/CookieConsent/CookieBannerOff";
import RevealFooter from "@/components/RevealFooter";
import { AGENCY_URL, MAIN_SITE_URL } from "@/lib/agency";

import AgencyFooter from "./components/AgencyFooter";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("agency.meta");
  const title = t("title");
  const description = t("description");
  const image = {
    url: `${MAIN_SITE_URL}/images/entei-og-image.webp`,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    metadataBase: new URL(AGENCY_URL),
    title: { absolute: title },
    description,
    keywords: [
      "leady dla software house",
      "pozyskiwanie klientów software house",
      "Meta Ads software house",
      "ENTEI",
    ],
    alternates: { canonical: AGENCY_URL },
    openGraph: {
      title,
      description,
      url: AGENCY_URL,
      images: [image],
      locale: "pl_PL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
    robots: { index: true, follow: true },
  };
}

export default function AgencyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* No cookie banner on the landing: the booking button is its only CTA. */}
      <CookieBannerOff />
      {/* Opaque content layer above the pinned footer (see RevealFooter). */}
      <div className="relative z-30 bg-concrete text-ink">
        <main>{children}</main>
      </div>
      <RevealFooter bgClassName="bg-primary">
        <AgencyFooter />
      </RevealFooter>
    </>
  );
}
