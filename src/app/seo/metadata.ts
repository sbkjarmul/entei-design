import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "ENTEI Studio Kreatywne | Projektowanie logo, projektowanie stron www, strategie marketingowe",
  description:
    "ENTEI Studio Graficzne zapewniające usługi: projektowanie logo, projektowanie stron internetowych, grafiki na social media oraz strategie marketingowe.",
  keywords: [
    "Projektowanie logo",
    "Projektowanie stron internetowych",
    "Grafiki na social media",
    "Studio kreatywne",
    "Studio graficzne",
    "Studio designu",
    "Studio brandingu",
    "Projekty graficzne",
    "Projekty wizualne",
    "Projekty brandingowe",
  ],
  openGraph: {
    title:
      "ENTEI Studio Kreatywne | Projektowanie logo, projektowanie stron www",
    description:
      "ENTEI Studio Graficzne zapewniające usługi: projektowanie logo, projektowanie stron internetowych, grafiki na social media.",
    url: "https://entei.design",
    images: [
      {
        url: "https://entei.design/images/entei-og-image.webp",
        width: 1200,
        height: 630,
        alt: "ENTEI to studio graficzne zapewniające usługi: projektowanie logo, projektowanie stron internetowych, grafiki na social media.",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },

  icons: {
    icon: "https://entei.design/images/entei-favicon.svg",
    shortcut: "https://entei.design/images/entei-favicon.svg",
    apple: "https://entei.design/images/entei-favicon.svg",
  },

  alternates: {
    canonical: "https://entei.design",
  },

  twitter: {
    card: "summary",
    site: "@entei",
    title:
      "ENTEI Studio Kreatywne | Projektowanie logo, projektowanie stron www",
    description:
      "ENTEI Studio Graficzne zapewniające usługi: projektowanie logo, projektowanie stron internetowych, grafiki na social media.",
    images: ["https://entei.design/images/entei-og-image.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
