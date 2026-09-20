import type { Metadata } from "next";

import { CAL_COM_LINK } from "@/lib/agency";

import BookingSection from "../components/BookingSection";
import CalComEmbed from "../components/CalComEmbed";

export const metadata: Metadata = {
  title: { absolute: "Cal.com — test wyglądu" },
  robots: { index: false, follow: false },
};

/**
 * Styling spike: the booking landing with Cal.com instead of Calendly, to
 * compare side by side. Delete this route once the provider is decided.
 * Point it at a real link with NEXT_PUBLIC_CAL_LINK (see src/lib/agency.ts).
 */
export default function AgencyBookingCalPage() {
  return <BookingSection calendar={<CalComEmbed calLink={CAL_COM_LINK} />} />;
}
