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
  title: "Studio Graficzne Stalowa Wola | Logo i Strony WWW | ENTEI",
  description:
    "Studio graficzne w Stalowej Woli. Projektujemy logo, identyfikację wizualną i strony internetowe dla lokalnych firm. Umów bezpłatną konsultację!",
  alternates: {
    canonical: "https://www.entei.design/studio-graficzne-stalowa-wola",
  },
  openGraph: {
    title: "Studio Graficzne Stalowa Wola | ENTEI",
    description:
      "Projektowanie logo, identyfikacji wizualnej i stron internetowych dla firm ze Stalowej Woli i okolic.",
    url: "https://www.entei.design/studio-graficzne-stalowa-wola",
    images: ["/images/entei-og-image.webp"],
  },
};

export default function StudioGraficzneStalowaWola() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Strona główna", url: "https://www.entei.design" },
          {
            name: "Studio Graficzne Stalowa Wola",
            url: "https://www.entei.design/studio-graficzne-stalowa-wola",
          },
        ]}
      />

      <Container className="px-6">
        <Section>
          <div className="flex flex-col gap-4 items-start">
            <AccentText>Stalowa Wola i okolice</AccentText>
            <Heading level={1}>
              Studio graficzne w{" "}
              <span className="text-gray-600">Stalowej Woli</span>
            </Heading>
            <Text className="text-gray-400">
              ENTEI to studio graficzne ze Stalowej Woli, które pomaga lokalnym
              firmom zbudować profesjonalny wizerunek. Tworzymy logo,
              identyfikację wizualną oraz nowoczesne strony internetowe, dzięki
              którym Twoja marka zostaje zapamiętana już od pierwszego kontaktu.
            </Text>
            <Button href="/contact" className="mt-2">
              Umów bezpłatną konsultację
            </Button>
          </div>
        </Section>

        <Section className="gap-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <Heading level={2}>
              Kompleksowa obsługa graficzna dla firm ze{" "}
              <span className="text-gray-600">Stalowej Woli</span>
            </Heading>
            <Text className="text-gray-400">
              Działamy lokalnie i rozumiemy specyfikę rynku w Stalowej Woli oraz
              regionie podkarpackim. Niezależnie od tego, czy dopiero zakładasz
              firmę, czy chcesz odświeżyć istniejącą markę, zajmiemy się każdym
              elementem Twojego wizerunku: od nazwy, przez projekt logo, aż po
              stronę internetową.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <Heading level={3} className="text-gray-100">
                Projektowanie logo
              </Heading>
              <Text className="text-gray-400">
                Ponadczasowe logo i znaki firmowe, które wyróżnią Twoją firmę na
                tle konkurencji w Stalowej Woli.
              </Text>
            </div>
            <div className="flex flex-col gap-2">
              <Heading level={3} className="text-gray-100">
                Identyfikacja wizualna
              </Heading>
              <Text className="text-gray-400">
                Spójny system wizualny: kolory, typografia, materiały firmowe i
                księga znaku, które budują rozpoznawalność marki.
              </Text>
            </div>
            <div className="flex flex-col gap-2">
              <Heading level={3} className="text-gray-100">
                Strony internetowe
              </Heading>
              <Text className="text-gray-400">
                Szybkie i nowoczesne strony www w technologii React i Next.js,
                które realnie zwiększają sprzedaż.
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
                Lokalne realizacje, które robią różnicę
              </Heading>
              <p className="text-base max-w-2xl text-gray-600">
                Mieliśmy przyjemność współpracować z firmami z naszego regionu.
                Jednym z przykładów jest rebranding pizzerii Italiana ze Stalowej
                Woli, lokalnego lidera, dla którego stworzyliśmy nową, nowoczesną
                identyfikację wizualną z charakterystycznym motywem wilka.
                Obsługujemy klientów ze Stalowej Woli oraz okolic: Niska,
                Tarnobrzega i Sandomierza.
              </p>
            </div>
            <div className="flex-1 w-full">
              <Link href="/case-study/italiana" className="w-full block">
                <CaseStudyCard
                  categories={["Rebranding", "Identyfikacja wizualna"]}
                  image="/images/case-studies/italiana-case-study-card.png"
                  logo="/images/case-studies/italiana-case-study-logo.svg"
                  title="Odświeżyliśmy markę Italiana w Stalowej Woli"
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
          <Heading level={2}>Zobacz nasze usługi lokalne</Heading>
          <LocalPageLinks current="/studio-graficzne-stalowa-wola" />
        </Section>

        <Section className="gap-6">
          <Heading level={2}>
            Kontakt, studio graficzne{" "}
            <span className="text-gray-600">Stalowa Wola</span>
          </Heading>
          <Text className="text-gray-400">
            Masz pomysł na projekt? Napisz do nas, odpowiadamy w ciągu 48 godzin
            roboczych.
          </Text>
          <LocalNap />
        </Section>
      </Container>

      <ContactSection />
    </>
  );
}
