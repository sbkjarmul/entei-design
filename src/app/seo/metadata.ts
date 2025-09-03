import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "ENTEI Studio Kreatywne | Projektowanie logo oraz nowoczesne strony internetowe.",
  description:
    "Pomagamy firmom zbudować profesjonalny wizerunek. Przyciągnij więcej klientów i zwiększ przychody za pomocą profesjonalnego brandingu, nowoczesnych stron internetowych oraz angażujących grafik na social media.",
  keywords: [
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
      "ENTEI Studio Graficzne | Projektowanie logo, projektowanie stron www",
    description:
      "Projektowanie logo, projektowanie stron internetowych, grafiki na social media.",
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
      "Projektowanie logo, projektowanie stron internetowych, grafiki na social media.",
    images: ["https://entei.design/images/entei-og-image.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
