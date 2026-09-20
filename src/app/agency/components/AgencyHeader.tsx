import Image from "next/image";
import { getTranslations } from "next-intl/server";

import BookingButton from "./BookingButton";

interface AgencyHeaderProps {
  /** Booking CTA on the right. Off on the booking page (the calendar is the CTA). */
  withCta?: boolean;
}

export default async function AgencyHeader({
  withCta = true,
}: AgencyHeaderProps) {
  const t = await getTranslations("agency");

  return (
    <header className="flex w-full items-start justify-between p-4">
      <Image
        src="/images/agency/entei-wordmark-ink.svg"
        alt={t("logoAlt")}
        width={96}
        height={20}
        priority
        className="shrink-0"
      />
      {withCta && (
        <BookingButton
          variant="dark"
          withSignal
          label={t("cta.label")}
          shortLabel={t("cta.labelShort")}
        />
      )}
    </header>
  );
}
