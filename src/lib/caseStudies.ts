/**
 * Case study registry — single source of truth for portfolio projects.
 *
 * Template-driven case studies (with `body`) are rendered by the dynamic route
 * `src/app/case-study/[slug]/page.tsx` via <CaseStudyTemplate />. The page
 * structure mirrors berrielbrands.com „works": hero (title + intro) → full-bleed
 * feature image → two-column body (sticky metadata + prose/quotes) → full-bleed
 * gallery → latest works → CTA.
 *
 * Copy lives in next-intl messages under `caseStudy.<i18nKey>` (per project) and
 * `caseStudyChrome` (shared labels). Non-localized data (image paths, year,
 * country/industry/service keys, block order) lives here.
 *
 * Legacy case studies (rem-met, ceramido, italiana, suseu) still have their own
 * static `page.tsx` folders, which take routing precedence over [slug]. They are
 * listed here without a `body` so they appear in "Latest works".
 */

const IMG = "/images/case-studies";
const A = `${IMG}/art-mat`;

/** Shared contact CTA target (Calendly booking). */
export const CALENDLY_URL = "https://calendly.com/entei-designs/30min";

/**
 * Images keep their natural proportions (no cropping); rendered stacked, full-width.
 * Set `full` to render edge-to-edge, full viewport height (cover).
 */
export type CaseImage = { src: string; alt: string; full?: boolean };

/** Prose blocks rendered in the right column beside the sticky metadata. */
export type ProseBlock =
  | { type: "text"; k: string } // k -> caseStudy.<key>.<k>.body
  | { type: "quote"; k: string } // k -> caseStudy.<key>.quote.<k>
  | { type: "details"; k: string } // k -> caseStudy.<key>.details.<k>.heading + .items[]
  | { type: "fileUnder"; k: string }; // k -> caseStudy.<key>.<k>[] (tags array)

export type CaseStudy = {
  /** URL segment, e.g. "art-mat" -> /case-study/art-mat */
  slug: string;
  /** Brand display name (not localized), e.g. "Art-Mat" */
  name: string;
  /** Canonical link for listings / latest-works (internal or external) */
  href: string;
  /** Country dictionary key -> caseStudyChrome.countryValues.<key> */
  countryKey: string;
  /** Card data for grid listings */
  card?: { image: string; logo?: string; categories: string[] };
  comingSoon?: boolean;

  /* ---- Template-driven case studies only (below) ---- */
  /** Messages namespace suffix: caseStudy.<i18nKey> */
  i18nKey?: string;
  year?: number;
  industryKey?: string; // caseStudyChrome.industryValues.<key>
  servicesKeys?: string[]; // caseStudyChrome.serviceValues.<key>
  liveUrl?: string;
  /** Feature image directly under the hero. */
  featureImage?: CaseImage;
  /** Prose column (sticky metadata sits beside it). */
  body?: ProseBlock[];
  /** Images stacked full-width below the body. */
  gallery?: CaseImage[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "art-mat",
    name: "Art-Mat",
    href: "/case-study/art-mat",
    countryKey: "poland",
    i18nKey: "artMat",
    year: 2025,
    industryKey: "automotive",
    servicesKeys: ["strategy", "identity", "web"],
    liveUrl: "https://art-mat.com.pl",
    card: {
      image: `${IMG}/art-mat-case-study-card.png`,
      logo: `${IMG}/art-mat-case-study-logo.svg`,
      categories: ["Branding", "Strona internetowa"],
    },
    featureImage: {
      src: `${A}/art-mat-mockup-tablet-steel.png`,
      alt: "Art-Mat, tablet z identyfikacją na stalowym tle",
    },
    body: [
      { type: "text", k: "description" },
      { type: "text", k: "challenge" },
      { type: "quote", k: "promise" },
      { type: "text", k: "concept" },
      { type: "quote", k: "gold" },
      { type: "text", k: "results" },
      { type: "details", k: "scope" },
      { type: "fileUnder", k: "tags" },
    ],
    gallery: [
      { src: `${A}/art-mat-logo.png`, alt: "Logo Art-Mat, znak i logotyp" },
      { src: `${A}/art-mat-mockup-tire.png`, alt: "Opona z brandingiem Art-Mat" },
      {
        src: `${A}/art-mat-mockup-business-cards.png`,
        alt: "Wizytówki Art-Mat",
      },
      {
        src: `${A}/art-mat-mockup-caddy.png`,
        alt: "Samochód serwisowy Art-Mat",
      },
      {
        src: `${A}/art-mat-mockup-phone-jacket.png`,
        alt: "Telefon i odzież firmowa Art-Mat",
      },
      {
        src: `${A}/art-mat-mockup-phone-price.png`,
        alt: "Aplikacja Art-Mat z cennikiem",
      },
      { src: `${A}/art-mat-mockup-badge.png`, alt: "Naszywka Art-Mat" },
      {
        src: `${A}/art-mat-mockup-brandguidelines.png`,
        alt: "Księga znaku Art-Mat",
      },
      {
        src: `${A}/art-mat-folders-mockup.png`,
        alt: "Teczki firmowe Art-Mat",
      },
      {
        src: `${A}/art-mat-mockup-winter-cap.png`,
        alt: "Czapka zimowa z logo Art-Mat",
      },
      { src: `${A}/art-mat-mockup-cups.png`, alt: "Kubki firmowe Art-Mat" },
    ],
  },

  /* ---- Legacy case studies (static folders) — listed for "Latest works" ---- */
  {
    slug: "rem-met",
    name: "REM-MET",
    href: "/case-study/rem-met",
    countryKey: "poland",
    card: {
      image: `${IMG}/rem-met-case-study-card.png`,
      logo: `${IMG}/rem-met-case-study-logo.svg`,
      categories: ["Identyfikacja wizualna", "Strona internetowa"],
    },
  },
  {
    slug: "ceramido",
    name: "Ceramido",
    href: "/case-study/ceramido",
    countryKey: "poland",
    card: {
      image: `${IMG}/ceramido-case-study-card.png`,
      logo: `${IMG}/ceramido-case-study-logo.svg`,
      categories: ["Branding", "Opakowania produktowe"],
    },
  },
  {
    slug: "italiana",
    name: "Italiana",
    href: "/case-study/italiana",
    countryKey: "poland",
    card: {
      image: `${IMG}/italiana-case-study-card.png`,
      logo: `${IMG}/italiana-case-study-logo.svg`,
      categories: ["Rebranding", "Identyfikacja wizualna"],
    },
  },
  {
    slug: "suseu",
    name: "Suseu",
    href: "/case-study/suseu",
    countryKey: "poland",
    card: {
      image: `${IMG}/suseu-case-study-card.png`,
      logo: `${IMG}/suseu-case-study-logo.svg`,
      categories: ["Branding", "Aplikacja mobilna", "Aplikacja webowa"],
    },
  },
];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  CASE_STUDIES.find((c) => c.slug === slug);

/** Slugs rendered by the dynamic template route (have a `body`). */
export const getTemplateSlugs = (): string[] =>
  CASE_STUDIES.filter((c) => c.body?.length).map((c) => c.slug);

/** Other projects for the "Latest works" list (excludes the current slug). */
export const getOtherCaseStudies = (slug: string): CaseStudy[] =>
  CASE_STUDIES.filter((c) => c.slug !== slug);
