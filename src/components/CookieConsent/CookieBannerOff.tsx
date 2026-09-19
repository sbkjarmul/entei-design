"use client";

import { useEffect } from "react";

import { useConsent } from "./ConsentProvider";

/**
 * Render inside a layout/page to hide the cookie consent banner there.
 * Tracking still only loads after consent given elsewhere on the same origin.
 * Runs before the provider marks itself mounted (child effects fire first),
 * so the banner never flashes.
 */
export default function CookieBannerOff() {
  const { setBannerSuppressed } = useConsent();

  useEffect(() => {
    setBannerSuppressed(true);
    return () => setBannerSuppressed(false);
  }, [setBannerSuppressed]);

  return null;
}
