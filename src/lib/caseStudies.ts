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
 * An entry listed without a `body` would render only in "Latest works" (no
 * template page); all current case studies are template-driven.
 */

const IMG = "/images/case-studies";
const A = `${IMG}/art-mat`;
const H = `${IMG}/hatan`;
const R = `${IMG}/rem-met`;
const C = `${IMG}/ceramido`;
const I = `${IMG}/italiana`;
const S = `${IMG}/suseu`;

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
  | { type: "section"; k: string } // k -> caseStudy.<key>.<k>.heading + .body
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

  {
    slug: "hatan",
    name: "Hatan",
    href: "/case-study/hatan",
    countryKey: "poland",
    i18nKey: "hatan",
    year: 2024,
    industryKey: "music",
    servicesKeys: ["strategy", "identity", "social"],
    liveUrl: "https://www.instagram.com/hatan_pl",
    card: {
      image: `${IMG}/hatan-case-study-card.png`,
      logo: `${IMG}/hatan-case-study-logo.svg`,
      categories: ["Branding", "Identyfikacja wizualna"],
    },
    featureImage: {
      src: `${H}/hatan-banner-3-mockup.png`,
      alt: "Baner zewnętrzny z identyfikacją Hatan",
    },
    body: [
      { type: "text", k: "description" },
      { type: "text", k: "challenge" },
      { type: "quote", k: "concept" },
      { type: "text", k: "conceptBody" },
      { type: "quote", k: "style" },
      { type: "text", k: "results" },
      { type: "details", k: "scope" },
      { type: "fileUnder", k: "tags" },
    ],
    gallery: [
      {
        src: `${H}/hatan-brandmark-grid.png`,
        alt: "Znak Hatan zbudowany na siatce sferycznej",
      },
      {
        src: `${H}/hatan-wordmark-grid.png`,
        alt: "Wordmark Hatan na siatce projektowej",
      },
      { src: `${H}/hatan-envelope.png`, alt: "Koperta i papeteria Hatan" },
      { src: `${H}/hatan-posters.png`, alt: "Plakaty eventowe Hatan" },
      { src: `${H}/hatan-wristbands.png`, alt: "Opaski eventowe Hatan" },
      { src: `${H}/hatan-tote-bag-mockup-2.png`, alt: "Torba materiałowa Hatan" },
      {
        src: `${H}/hatan-banner-veritcal-mockup.png`,
        alt: "Pionowy baner Hatan",
      },
      {
        src: `${H}/hatan-instagram-mockup.png`,
        alt: "Treści Hatan na Instagramie",
      },
    ],
  },

  {
    slug: "rem-met",
    name: "REM-MET",
    href: "/case-study/rem-met",
    countryKey: "poland",
    i18nKey: "remMet",
    year: 2025,
    industryKey: "industrial",
    servicesKeys: ["strategy", "identity", "web"],
    liveUrl: "https://www.rem-met.com",
    card: {
      image: `${IMG}/rem-met-case-study-card.png`,
      logo: `${IMG}/rem-met-case-study-logo.svg`,
      categories: ["Identyfikacja wizualna", "Strona internetowa"],
    },
    featureImage: {
      src: `${R}/rem-met-hero.png`,
      alt: "Katalog REM-MET na rok 2025",
    },
    body: [
      { type: "text", k: "description" },
      { type: "text", k: "challenge" },
      { type: "quote", k: "logo" },
      { type: "text", k: "concept" },
      { type: "quote", k: "naming" },
      { type: "text", k: "results" },
      { type: "details", k: "scope" },
      { type: "fileUnder", k: "tags" },
    ],
    gallery: [
      {
        src: `${R}/rem-met-gecko-black.png`,
        alt: "Wygrodzenia REM-MET GECKO na czarnym tle",
      },
      {
        src: `${R}/rem-met-logo-horizontal-black.png`,
        alt: "Poziome logo REM-MET na czarnym tle",
      },
      {
        src: `${R}/rem-met-squared-boxes.png`,
        alt: "Pudełka w kolorach REM-MET",
      },
      {
        src: `${R}/rem-met-mockup-posters.png`,
        alt: "Plakaty REM-MET na szarej ścianie",
      },
      {
        src: `${R}/rem-met-mockup-haning-poster-square.png`,
        alt: "Wiszący plakat REM-MET",
      },
      {
        src: `${R}/rem-met-product-names.png`,
        alt: "Nazwy produktów REM-MET: Gecko, Falcon i Rhino",
      },
      {
        src: `${R}/rem-met-mockup-box-no-light.png`,
        alt: "Opakowania na akcesoria REM-MET na czarnym tle",
      },
      {
        src: `${R}/rem-met-mockup-mug-pro-square.png`,
        alt: "Kubek firmowy REM-MET",
      },
      {
        src: `${R}/rem-met-binder-mockup-black.png`,
        alt: "Segregator z projektami REM-MET",
      },
      {
        src: `${R}/rem-met-bus-stop.png`,
        alt: "Reklama REM-MET na wiacie przystankowej",
      },
      {
        src: `${R}/rem-met-city-2.png`,
        alt: "Reklama REM-MET w przestrzeni miejskiej",
      },
      {
        src: `${R}/rem-met-website-o-nas.png`,
        alt: "Strona REM-MET, sekcja O nas",
      },
      {
        src: `${R}/rem-met-website-product.png`,
        alt: "Strona produktu REM-MET",
      },
      {
        src: `${R}/rem-met-mockup-catalog.png`,
        alt: "Katalog produktów REM-MET na rok 2025",
      },
    ],
  },
  {
    slug: "ceramido",
    name: "Ceramido",
    href: "/case-study/ceramido",
    countryKey: "poland",
    i18nKey: "ceramido",
    year: 2025,
    industryKey: "beauty",
    servicesKeys: ["strategy", "identity", "packaging"],
    card: {
      image: `${IMG}/ceramido-case-study-card.png`,
      logo: `${IMG}/ceramido-case-study-logo.svg`,
      categories: ["Branding", "Opakowania produktowe"],
    },
    featureImage: {
      src: `${C}/ceramido-black-billboard-mockup.png`,
      alt: "Billboard z identyfikacją Ceramido",
    },
    body: [
      { type: "text", k: "description" },
      { type: "text", k: "challenge" },
      { type: "quote", k: "logo" },
      { type: "text", k: "concept" },
      { type: "quote", k: "packaging" },
      { type: "text", k: "results" },
      { type: "details", k: "scope" },
      { type: "fileUnder", k: "tags" },
    ],
    gallery: [
      {
        src: `${C}/ceramido-day-product.png`,
        alt: "Suplement diety Ceramido DAY",
      },
      {
        src: `${C}/ceramido-rejected-symbols.png`,
        alt: "Odrzucone warianty symboli marki Ceramido",
      },
      {
        src: `${C}/ceramido-logo-explained.png`,
        alt: "Znaczenie symboli w logo Ceramido",
      },
      {
        src: `${C}/ceramido-logo-grid.png`,
        alt: "Logo Ceramido na siatce projektowej",
      },
      {
        src: `${C}/ceramido-luxury-billboard-box.png`,
        alt: "Billboard przedstawiający kolory Ceramido",
      },
      {
        src: `${C}/ceramido-posters-night.png`,
        alt: "Plakaty Ceramido na szarej ścianie",
      },
      {
        src: `${C}/ceramido-wordmark-grid-black.png`,
        alt: "Siatka projektowa dla typografii Ceramido",
      },
      {
        src: `${C}/ceramido-posters-multiple.png`,
        alt: "Plakaty Ceramido w przestrzeni miejskiej",
      },
      {
        src: `${C}/ceramido-shopping-bag-pattern.png`,
        alt: "Torba zakupowa Ceramido ze wzorem skóry",
      },
      {
        src: `${C}/ceramido-instagram.png`,
        alt: "Treści Ceramido na Instagramie",
      },
      {
        src: `${C}/ceramido-building-mockup.png`,
        alt: "Budynek z brandingiem Ceramido",
      },
      {
        src: `${C}/ceramido-light-box.png`,
        alt: "Podświetlany kaseton z marką Ceramido",
      },
    ],
  },
  {
    slug: "italiana",
    name: "Italiana",
    href: "/case-study/italiana",
    countryKey: "poland",
    i18nKey: "italiana",
    year: 2025,
    industryKey: "food",
    servicesKeys: ["strategy", "identity", "packaging"],
    card: {
      image: `${IMG}/italiana-case-study-card.png`,
      logo: `${IMG}/italiana-case-study-logo.svg`,
      categories: ["Rebranding", "Identyfikacja wizualna"],
    },
    featureImage: {
      src: `${I}/italiana-hero.png`,
      alt: "Koszulka Italiana z grafiką wilka i hasłem Wyj, Jedz, Gryź",
    },
    body: [
      { type: "text", k: "description" },
      { type: "text", k: "challenge" },
      { type: "quote", k: "wolf" },
      { type: "text", k: "concept" },
      { type: "quote", k: "rebel" },
      { type: "text", k: "results" },
      { type: "details", k: "scope" },
      { type: "fileUnder", k: "tags" },
    ],
    gallery: [
      {
        src: `${I}/italiana-compare-logo.png`,
        alt: "Porównanie starego i nowego logo pizzerii Italiana",
      },
      {
        src: `${I}/italiana-logo.png`,
        alt: "Znak marki Italiana – grafika wilka",
      },
      {
        src: `${I}/italiana-baner-fb.png`,
        alt: "Baner marki Italiana z logo wilka i hasłem Wyj, Jedz, Gryź",
      },
      {
        src: `${I}/italiana-wordmark.png`,
        alt: "Logotyp Italiana na czcionce ARCO",
      },
      {
        src: `${I}/italiana-t-shirt.png`,
        alt: "Biała koszulka Italiana z zielonym logo wilka na plecach",
      },
      {
        src: `${I}/italiana-brand-guidelines.png`,
        alt: "Rozkładówki brandbooka Italiana z wytycznymi do social mediów, fotografii i wizerunku lokalu",
      },
      {
        src: `${I}/italiana-place.png`,
        alt: "Witryna pizzerii Italiana z zieloną markizą i szyldem",
      },
      {
        src: `${I}/italiana-boxes.png`,
        alt: "Pudełka na pizzę Italiana z grafiką wilka",
      },
      {
        src: `${I}/italiana-menu.png`,
        alt: "Menu oraz ulotka promocyjna Italiana",
      },
      {
        src: `${I}/italiana-fast-food-packaging.png`,
        alt: "Zestaw opakowań Italiana: kubek, torba i pudełko",
      },
    ],
  },
  {
    slug: "suseu",
    name: "Suseu",
    href: "/case-study/suseu",
    countryKey: "poland",
    i18nKey: "suseu",
    year: 2025,
    industryKey: "saas",
    servicesKeys: ["strategy", "identity", "product"],
    liveUrl: "https://suseu.app",
    card: {
      image: `${IMG}/suseu-case-study-card.png`,
      logo: `${IMG}/suseu-case-study-logo.svg`,
      categories: ["Branding", "Aplikacja mobilna", "Aplikacja webowa"],
    },
    featureImage: {
      src: `${S}/suseu-mockup-posters.png`,
      alt: "Plakaty Suseu z brand hero na ścianie",
    },
    body: [
      { type: "text", k: "description" },
      { type: "section", k: "challenge" },
      { type: "quote", k: "brand" },
      // Brand Identity
      { type: "section", k: "strategicFoundation" },
      { type: "section", k: "typography" },
      { type: "section", k: "colorPalette" },
      { type: "section", k: "applications" },
      // UI/UX (product)
      { type: "section", k: "designProcess" },
      { type: "section", k: "mobileApp" },
      { type: "section", k: "webPlatform" },
      { type: "section", k: "testing" },
      { type: "quote", k: "product" },
      { type: "section", k: "results" },
      { type: "details", k: "scope" },
      { type: "fileUnder", k: "tags" },
    ],
    gallery: [
      // Realistic mockups with the 2D grids woven in
      // (logo grid and word grid never sit next to each other).
      {
        src: `${S}/suseu-mockup-cinema.png`,
        alt: "Reklama Suseu na ekranie kinowym",
      },
      {
        src: `${S}/suseu-logo-grid.png`,
        alt: "Konstrukcja znaku Suseu na siatce projektowej",
      },
      {
        src: `${S}/suseu-mockup-mac.png`,
        alt: "Platforma webowa Suseu na MacBooku",
      },
      {
        src: `${S}/suseu-mockup-app.png`,
        alt: "Aplikacja mobilna Suseu na smartfonie",
      },
      {
        src: `${S}/suseu-word-grid.png`,
        alt: "Konstrukcja logotypu Suseu na siatce projektowej",
      },
      {
        src: `${S}/suseu-mockup-t-shirt.png`,
        alt: "Koszulka z brandingiem Suseu",
      },
      {
        src: `${S}/suseu-metro-mockup.png`,
        alt: "Reklama Suseu w przestrzeni metra",
      },
      {
        src: `${S}/suseu-mockup-lightbox.png`,
        alt: "Podświetlany kaseton z logo Suseu",
      },
    ],
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
