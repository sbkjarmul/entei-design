import { NextResponse, type NextRequest } from "next/server";

import {
  AGENCY_HOSTS,
  AGENCY_PATH,
  AGENCY_SUBDOMAIN_LIVE,
  AGENCY_SUBDOMAIN_URL,
  AGENCY_SUBPATHS,
  MAIN_SITE_HOSTS,
  MAIN_SITE_URL,
} from "@/lib/agency";

/**
 * Host-based routing for the agency landing:
 *  - agency.entei.pl/        → rewrite to the `/agency` route (URL stays clean)
 *  - agency.entei.pl/agency  → redirect to `/`
 *  - agency.entei.pl/<other> → temporary redirect to the main site
 *  - www.entei.design/agency → permanent redirect to agency.entei.pl (no duplicate content),
 *    only once AGENCY_SUBDOMAIN_LIVE is on; until then the landing is served there
 *
 * Localhost and Vercel preview hosts are left alone, so `/agency` stays reachable there.
 * Rewrites keep the page statically prerendered.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const { pathname, search } = request.nextUrl;

  if (AGENCY_HOSTS.includes(host)) {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`${AGENCY_PATH}${search}`, request.url));
    }
    if (AGENCY_SUBPATHS.includes(pathname)) {
      return NextResponse.rewrite(
        new URL(`${AGENCY_PATH}${pathname}${search}`, request.url),
      );
    }
    if (pathname === AGENCY_PATH) {
      return NextResponse.redirect(new URL(`/${search}`, request.url), 308);
    }
    if (pathname.startsWith(`${AGENCY_PATH}/`)) {
      return NextResponse.redirect(
        new URL(`${pathname.slice(AGENCY_PATH.length)}${search}`, request.url),
        308,
      );
    }
    return NextResponse.redirect(new URL(`${pathname}${search}`, MAIN_SITE_URL), 307);
  }

  const isAgencyPath =
    pathname === AGENCY_PATH || pathname.startsWith(`${AGENCY_PATH}/`);
  if (AGENCY_SUBDOMAIN_LIVE && MAIN_SITE_HOSTS.includes(host) && isAgencyPath) {
    return NextResponse.redirect(new URL(`/${search}`, AGENCY_SUBDOMAIN_URL), 308);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals, API routes, static assets and any file with an extension.
  matcher: ["/((?!_next/|api/|images/|fonts/|.*\\..*).*)"],
};
