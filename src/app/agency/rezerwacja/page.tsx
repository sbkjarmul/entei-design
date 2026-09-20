import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AGENCY_BOOKING_URL, CAL_COM_LINK, MAIN_SITE_URL } from "@/lib/agency";

import BookingSection from "../components/BookingSection";
import CalComEmbed from "../components/CalComEmbed";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("agency.booking.meta");
  const title = t("title");
  const description = t("description");
  const image = {
    url: `${MAIN_SITE_URL}/images/entei-og-image.webp`,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: AGENCY_BOOKING_URL },
    openGraph: {
      title,
      description,
      url: AGENCY_BOOKING_URL,
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
    // Ad traffic only: keep it out of search so it doesn't compete with /agency.
    robots: { index: false, follow: true },
  };
}

/**
 * Booking landing for ad campaigns: the agency hero with an embedded Cal.com
 * booker. Served at agency.entei.pl/rezerwacja once the subdomain is live.
 */
export default async function AgencyBookingPage() {
  const t = await getTranslations("agency.booking");

  return (
    <BookingSection
      calendar={
        <CalComEmbed
          calLink={CAL_COM_LINK}
          label={t("calendarLabel")}
          fallbackPrefix={t("fallbackPrefix")}
          fallbackLink={t("fallbackLink")}
        />
      }
    />
  );
}
