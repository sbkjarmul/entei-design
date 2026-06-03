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
  title: "Logo Stalowa Wola | Projektowanie Logo i Znaków | ENTEI",
  description:
    "Profesjonalne projektowanie logo w Stalowej Woli. Tworzymy ponadczasowe, unikalne logo i znaki firmowe dla lokalnych firm. Sprawdź ofertę i umów konsultację!",
  alternates: {
    canonical: "https://www.entei.design/logo-stalowa-wola",
  },
  openGraph: {
    title: "Projektowanie Logo Stalowa Wola | ENTEI",
    description:
      "Ponadczasowe, unikalne logo i znaki firmowe dla firm ze Stalowej Woli i okolic.",
    url: "https://www.entei.design/logo-stalowa-wola",
    images: ["/images/entei-og-image.webp"],
  },
};

export default function LogoStalowaWola() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Strona główna", url: "https://www.entei.design" },
          {
            name: "Logo Stalowa Wola",
            url: "https://www.entei.design/logo-stalowa-wola",
          },
        ]}
      />

      <Container className="px-6">
        <Section>
          <div className="flex flex-col gap-4 items-start">
            <AccentText>Projektowanie logo</AccentText>
            <Heading level={1}>
              Projektowanie logo{" "}
              <span className="text-gray-600">Stalowa Wola</span>
            </Heading>
            <Text className="text-gray-400">
              Szukasz studia, które zaprojektuje logo dla Twojej firmy w Stalowej
              Woli? Tworzymy ponadczasowe, unikalne znaki, które oddają charakter
              marki i wyróżniają ją na lokalnym rynku. Każdy projekt logo
              poprzedzamy analizą branży i konkurencji.
            </Text>
            <Button href="/contact" className="mt-2">
              Zamów projekt logo
            </Button>
          </div>
        </Section>

        <Section className="gap-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <Heading level={2}>
              Jak projektujemy logo dla firm ze{" "}
              <span className="text-gray-600">Stalowej Woli</span>
            </Heading>
            <Text className="text-gray-400">
              Dobre logo to nie tylko ładny symbol. To fundament całej
              identyfikacji wizualnej. Nasz proces jest przemyślany i
              przejrzysty, dzięki czemu otrzymujesz znak gotowy do użycia w
              każdym kanale: od szyldu, przez wizytówki, po media
              społecznościowe.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-despair-time text-4xl text-primary">01</span>
              <Heading level={3} className="text-gray-100">
                Analiza i strategia
              </Heading>
              <Text className="text-gray-400">
                Poznajemy Twoją firmę, grupę docelową i konkurencję w Stalowej
                Woli, aby logo realnie pracowało na Twój biznes.
              </Text>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-despair-time text-4xl text-primary">02</span>
              <Heading level={3} className="text-gray-100">
                Projektowanie znaku
              </Heading>
              <Text className="text-gray-400">
                Przygotowujemy koncepcje logo, dobieramy typografię i kolory,
                tworzymy spójny, rozpoznawalny znak.
              </Text>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-despair-time text-4xl text-primary">03</span>
              <Heading level={3} className="text-gray-100">
                Księga znaku
              </Heading>
              <Text className="text-gray-400">
                Otrzymujesz komplet plików oraz wytyczne stosowania logo, aby
                marka wyglądała profesjonalnie wszędzie.
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
                Przykład realizacji logo w Stalowej Woli
              </Heading>
              <p className="text-base max-w-2xl text-gray-600">
                Dla pizzerii Italiana ze Stalowej Woli zaprojektowaliśmy nowe
                logo oparte na motywie wilka, znak, który od razu buduje
                charakter marki i świetnie sprawdza się zarówno na opakowaniach,
                jak i w social mediach. Tworzymy logo dla firm ze Stalowej Woli,
                Niska, Tarnobrzega i Sandomierza.
              </p>
            </div>
            <div className="flex-1 w-full">
              <Link href="/case-study/italiana" className="w-full block">
                <CaseStudyCard
                  categories={["Projekt logo", "Rebranding"]}
                  image="/images/case-studies/italiana-case-study-card.png"
                  logo="/images/case-studies/italiana-case-study-logo.svg"
                  title="Nowe logo dla pizzerii Italiana ze Stalowej Woli"
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
          <LocalPageLinks current="/logo-stalowa-wola" />
        </Section>

        <Section className="gap-6">
          <Heading level={2}>
            Zamów logo{" "}
            <span className="text-gray-600">Stalowa Wola</span>
          </Heading>
          <Text className="text-gray-400">
            Napisz do nas i opowiedz o swoim projekcie. Przygotujemy wycenę i
            propozycję współpracy.
          </Text>
          <LocalNap />
        </Section>
      </Container>

      <ContactSection />
    </>
  );
}
