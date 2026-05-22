"use client";

import Link from "next/link";

import Button from "@/components/Button";
import { useConsent } from "./ConsentProvider";

/**
 * Bottom-anchored cookie consent banner shown until the user makes a choice,
 * and again whenever they re-open it via "Manage cookies" in the footer.
 */
export default function CookieConsentBanner() {
  const { consent, mounted, isBannerOpen, accept, reject } = useConsent();

  // Avoid a hydration mismatch — render nothing until the stored value is read.
  if (!mounted) {
    return null;
  }

  // Hide once a choice has been made, unless the user re-opened the banner.
  if (consent !== null && !isBannerOpen) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-5 rounded-xl border border-gray-800 bg-gray-950 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-medium text-gray-100">
            Szanujemy Twoją prywatność
          </h2>
          <p className="text-sm text-gray-500">
            Używamy plików cookies do celów analitycznych i marketingowych.
            Możesz zaakceptować wszystkie pliki lub ograniczyć je do
            niezbędnych. Szczegóły znajdziesz w{" "}
            <Link
              href="/polityka-prywatnosci"
              className="text-gray-300 underline hover:text-primary"
            >
              Polityce prywatności
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            variant="secondary"
            onClick={reject}
            className="border border-gray-800"
          >
            Tylko niezbędne
          </Button>
          <Button variant="primary" onClick={accept}>
            Akceptuję
          </Button>
        </div>
      </div>
    </div>
  );
}
