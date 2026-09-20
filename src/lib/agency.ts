/**
 * Agency landing (agency.entei.pl) — shared constants.
 * Imported by the middleware too, so keep this file free of React/server-only code.
 */

export const MAIN_SITE_URL = "https://www.entei.design";
export const MAIN_SITE_HOSTS = ["www.entei.design", "entei.design"];

export const AGENCY_PATH = "/agency";
export const AGENCY_SUBDOMAIN_URL = "https://agency.entei.pl";

/**
 * Flip to `true` once agency.entei.pl is added in Vercel and DNS points at it.
 * Until then the landing is public at www.entei.design/agency (canonical there,
 * no redirect to the subdomain).
 */
export const AGENCY_SUBDOMAIN_LIVE = false;

/** Public (canonical) URL of the landing. */
export const AGENCY_URL = AGENCY_SUBDOMAIN_LIVE
  ? AGENCY_SUBDOMAIN_URL
  : `${MAIN_SITE_URL}${AGENCY_PATH}`;

/** Cal.com booking link (`user/event-type`) behind the booking landing. */
export const CAL_COM_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "entei/15min";

/** Public URL of the booking landing (hero + embedded Cal.com booker). */
export const AGENCY_BOOKING_URL = `${AGENCY_URL}/rezerwacja`;

/**
 * Landing subpages, as seen from the landing root. On the agency host they are
 * rewritten to `/agency/<subpath>`; everything else there goes to the main site.
 */
export const AGENCY_SUBPATHS: string[] = ["/rezerwacja"];

/** Hosts that serve the landing at `/`. `agency.localhost` is for local testing. */
export const AGENCY_HOSTS = ["agency.entei.pl", "agency.localhost"];
