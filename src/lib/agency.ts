/**
 * Agency landing (agency.entei.pl) — shared constants.
 * Imported by the middleware too, so keep this file free of React/server-only code.
 */

/** Public URL of the landing. The page itself lives at the internal route `/agency`. */
export const AGENCY_URL = "https://agency.entei.pl";
export const AGENCY_PATH = "/agency";

/** Hosts that serve the landing at `/`. `agency.localhost` is for local testing. */
export const AGENCY_HOSTS = ["agency.entei.pl", "agency.localhost"];

export const MAIN_SITE_URL = "https://www.entei.design";
export const MAIN_SITE_HOSTS = ["www.entei.design", "entei.design"];

export const CONTACT_EMAIL = "hello@entei.design";
export const INSTAGRAM_URL = "https://instagram.com/entei.designs";
export const PRIVACY_POLICY_URL = `${MAIN_SITE_URL}/polityka-prywatnosci`;
