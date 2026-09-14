"use client";

import { useConsent } from "@/components/CookieConsent/ConsentProvider";

export default function ManageCookiesButton({ label }: { label: string }) {
  const { openBanner } = useConsent();

  return (
    <button
      type="button"
      onClick={openBanner}
      className="cursor-pointer text-left hover:opacity-70"
    >
      {label}
    </button>
  );
}
