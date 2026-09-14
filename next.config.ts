import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const YEAR = 60 * 60 * 24 * 365;
const MONTH = 60 * 60 * 24 * 30;

const nextConfig: NextConfig = {
  // Lets `next dev` serve the agency landing on http://agency.localhost:3000
  // (host-based rewrite in src/middleware.ts).
  allowedDevOrigins: ["agency.localhost"],

  images: {
    // AVIF first (~30% smaller than WebP), WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Optimized variants stay in the CDN cache for a month instead of being
    // re-generated from the (large) source files.
    minimumCacheTTL: MONTH,
    // Drop the default 3840px tier — nothing on the site is displayed wider
    // than ~2048px, and that tier alone produced ~300 kB responses.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  async headers() {
    return [
      {
        // Static assets in /public are served with `max-age=0, must-revalidate`
        // by default, so browsers re-check every image on every navigation.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${MONTH}, stale-while-revalidate=${MONTH}`,
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${YEAR}, immutable` },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
