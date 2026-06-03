import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/Container";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import Button from "@/components/Button";
import AccentText from "@/components/AccentText";
import CaseStudyCard from "@/components/CaseStudyCard";
import LocalNap from "@/components/Local/LocalNap";
import LocalPageLinks from "@/components/Local/LocalPageLinks";
import BreadcrumbSchema from "@/components/StructuredData/BreadcrumbSchema";
import ContactSection from "../components/ContactSection";

export const metadata: Metadata = {
  title: "Strony Internetowe Stalowa Wola | Tworzenie Stron WWW | ENTEI",
  description:
    "Tworzenie stron internetowych w Stalowej Woli. Nowoczesne, szybkie strony www i sklepy w technologii React i Next.js. Zwiększ sprzedaż. Umów konsultację!",
  alternates: {
    canonical: "https://www.entei.design/strony-internetowe-stalowa-wola",
  },
  openGraph: {
    title: "Strony Internetowe Stalowa Wola | ENTEI",
    description:
      "Nowoczesne i szybkie strony internetowe dla firm ze Stalowej Woli i okolic.",
    url: "https://www.entei.design/strony-internetowe-stalowa-wola",
    images: ["/images/entei-og-image.webp"],
  },
};

export default function StronyInternetoweStalowaWola() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Strona główna", url: "https://www.entei.design" },
          {
            name: "Strony Internetowe Stalowa Wola",
            url: "https://www.entei.design/strony-internetowe-stalowa-wola",
          },
        ]}
      />

      <Container className="px-6">
        <Section>
          <div className="flex flex-col gap-4 items-start">
            <AccentText>Strony i aplikacje webowe</AccentText>
            <Heading level={1}>
              Strony internetowe{" "}
              <span className="text-gray-600">Stalowa Wola</span>
            </Heading>
            <Text className="text-gray-400">
              Projektujemy i tworzymy nowoczesne strony internetowe dla firm ze
              Stalowej Woli. Stawiamy na szybkość, czytelny design i konwersję.
              Tworzymy strony, które nie tylko dobrze wyglądają, ale realnie
              przyciągają klientów i zwiększają sprzedaż.
            </Text>
            <Button href="/contact" className="mt-2">
              Wyceń swoją stronę
            </Button>
          </div>
        </Section>

        <Section className="gap-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <Heading level={2}>
              Tworzenie stron www dla firm w{" "}
              <span className="text-gray-600">Stalowej Woli</span>
            </Heading>
            <Text className="text-gray-400">
              Budujemy strony w nowoczesnej technologii React i Next.js, które
              ładują się błyskawicznie i świetnie pozycjonują się w Google.
              Każdą stronę projektujemy indywidualnie, dopasowując ją do
              charakteru Twojej marki i potrzeb klientów z regionu.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <Heading level={3} className="text-gray-100">
                Strony firmowe
              </Heading>
              <Text className="text-gray-400">
                Wizytówki i strony usługowe, które budują wiarygodność i
                pozyskują zapytania od klientów.
              </Text>
            </div>
            <div className="flex flex-col gap-2">
              <Heading level={3} className="text-gray-100">
                Landing page
              </Heading>
              <Text className="text-gray-400">
                Strony sprzedażowe pod konkretną kampanię, zaprojektowane z myślą
                o maksymalnej konwersji.
              </Text>
            </div>
            <div className="flex flex-col gap-2">
              <Heading level={3} className="text-gray-100">
                Aplikacje webowe
              </Heading>
              <Text className="text-gray-400">
                Zaawansowane platformy i aplikacje SaaS w React i Next.js,
                tworzone od projektu po wdrożenie.
              </Text>
            </div>
          </div>
        </Section>
      </Container>

      <Section className="bg-white">
        <Container className="px-6">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 flex flex-col gap-4">
              <Heading level={2} className="text-gray-800">
                Przykład realizacji strony internetowej w Stalowej Woli
              </Heading>
              <p className="text-base max-w-2xl text-gray-600">
                Dla firmy REM-MET ze Stalowej Woli zaprojektowaliśmy i
                wdrożyliśmy nową stronę internetową wraz z pełną identyfikacją
                wizualną. Nowoczesny, szybki serwis pomaga prezentować ofertę i
                pozyskiwać klientów. Takie strony tworzymy dla firm ze Stalowej
                Woli oraz okolic: Niska, Tarnobrzega i Sandomierza.
              </p>
            </div>
            <div className="flex-1 w-full">
              <Link href="/case-study/rem-met" className="w-full block">
                <CaseStudyCard
                  categories={["Strona internetowa", "Identyfikacja wizualna"]}
                  image="/images/case-studies/rem-met-case-study-card.png"
                  logo="/images/our-clients/rem-met-logo.png"
                  title="Nowa strona internetowa dla REM-MET ze Stalowej Woli"
                  size="small"
                  titleClassName="text-gray-700"
                />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Container className="px-6">
        <Section className="gap-6">
          <Heading level={2}>Powiązane usługi</Heading>
          <LocalPageLinks current="/strony-internetowe-stalowa-wola" />
        </Section>

        <Section className="gap-6">
          <Heading level={2}>
            Zamów stronę internetową{" "}
            <span className="text-gray-600">Stalowa Wola</span>
          </Heading>
          <Text className="text-gray-400">
            Opowiedz nam o swoim projekcie, przygotujemy propozycję i wycenę
            dopasowaną do Twoich potrzeb.
          </Text>
          <LocalNap />
        </Section>
      </Container>

      <ContactSection />
    </>
  );
}
