import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.entei.design"),
  title:
    "ENTEI Studio Graficzne Stalowa Wola | Logo i Strony Internetowe",
  description:
    "Studio graficzne ze Stalowej Woli. Projektujemy logo, identyfikację wizualną i nowoczesne strony internetowe, które pomagają firmom przyciągnąć więcej klientów i zwiększyć przychody.",
  keywords: [
    "studio graficzne stalowa wola",
    "logo stalowa wola",
    "strony internetowe stalowa wola",
    "projektowanie logo stalowa wola",
    "agencja reklamowa stalowa wola",
    "projektowanie logo",
    "identyfikacja wizualna",
    "strony www",
    "grafik freelancer",
    "grafiki na social media",
    "projektowanie brandingu",
    "cennik usług graficznych",
    "agencja brandingowa",
    "projektowanie stron internetowych",
  ],
  authors: [{ name: "ENTEI" }],
  openGraph: {
    title:
      "ENTEI Studio Graficzne Stalowa Wola | Logo, Strony Internetowe, Branding",
    description:
      "Studio graficzne ze Stalowej Woli. Projektowanie logo, stron internetowych i identyfikacji wizualnej.",
    url: "https://www.entei.design",
    images: [
      {
        url: "https://www.entei.design/images/entei-og-image.webp",
        width: 1200,
        height: 630,
        alt: "ENTEI studio graficzne ze Stalowej Woli: projektowanie logo, stron internetowych oraz identyfikacji wizualnej.",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },

  icons: {
    icon: "https://www.entei.design/images/entei-favicon.svg",
    shortcut: "https://www.entei.design/images/entei-favicon.svg",
    apple: "https://www.entei.design/images/entei-favicon.svg",
  },

  alternates: {
    canonical: "https://www.entei.design",
  },

  twitter: {
    card: "summary",
    site: "@entei",
    title:
      "ENTEI Studio Graficzne Stalowa Wola | Logo i Strony Internetowe",
    description:
      "Studio graficzne ze Stalowej Woli. Projektowanie logo, stron internetowych i identyfikacji wizualnej.",
    images: ["https://www.entei.design/images/entei-og-image.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
