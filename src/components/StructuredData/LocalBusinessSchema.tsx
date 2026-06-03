/**
 * JSON-LD structured data describing ENTEI as a local design studio in Stalowa Wola.
 * Rendered once in the root layout so every page exposes consistent NAP data to Google.
 * The NAP (name / address / contact) here MUST match the Google Business Profile and the footer.
 */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.entei.design/#studio",
  name: "ENTEI Studio Graficzne",
  alternateName: "ENTEI Design",
  description:
    "Studio graficzne ze Stalowej Woli. Projektowanie logo, identyfikacji wizualnej oraz nowoczesnych stron internetowych.",
  image: "https://www.entei.design/images/entei-og-image.webp",
  logo: "https://www.entei.design/images/entei-favicon.svg",
  url: "https://www.entei.design",
  email: "hello@entei.design",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stalowa Wola",
    addressRegion: "Podkarpackie",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "50.5826",
    longitude: "22.0537",
  },
  areaServed: [
    { "@type": "City", name: "Stalowa Wola" },
    { "@type": "City", name: "Nisko" },
    { "@type": "City", name: "Tarnobrzeg" },
    { "@type": "City", name: "Sandomierz" },
  ],
  sameAs: ["https://instagram.com/entei.designs"],
  founder: {
    "@type": "Person",
    name: "Sebastian Jarmul",
  },
  knowsAbout: [
    "projektowanie logo",
    "strony internetowe",
    "identyfikacja wizualna",
    "branding",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Usługi studia graficznego",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Projektowanie logo",
          areaServed: { "@type": "City", name: "Stalowa Wola" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Projektowanie stron internetowych",
          areaServed: { "@type": "City", name: "Stalowa Wola" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Identyfikacja wizualna i branding",
          areaServed: { "@type": "City", name: "Stalowa Wola" },
        },
      },
    ],
  },
};

export default function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
