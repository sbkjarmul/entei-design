import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Link from "next/link";
import ContactSection from "../../components/ContactSection";
import Text from "@/components/Text";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Image from "next/image";

export default function BrandingSericePage() {
  return (
    <div className="inset-0 flex flex-col gap-10 w-screen min-h-fit items-center justify-center p-0 md:py-8 relative overflow-hidden">
      <Container className="flex flex-col gap-10">
        <section className="max-w-xl my-20">
          <Heading level={1} className="leading-5 ">
            <span className="text-5xl font-light text-gray-500">
              <span className="font-medium text-gray-100 ">Branding, </span>
              identifykacja wizualna oraz strategia marki
            </span>
          </Heading>
        </section>

        <div className="border border-solid border-gray-800" />

        <section className="w-full flex flex-col gap-4">
          <Heading level={2} className="leading-5 max-w-none">
            <span className="text-3xl font-medium text-gray-200">
              Wyróżnij się na tle konkurencji za pomocą nowoczesnej
              identyfikacji wizualnej.
            </span>
          </Heading>
          <span>
            <span className="font-despair-time text-9xl text-gray-100">5</span>
            <span className="font-despair-time text-3xl text-gray-100">
              sekund
            </span>
          </span>
          <p className="text-xl text-gray-500">
            Tyle czasu zajmuje przeciętnemu człowiekowi ocenienie, czy marka mu
            się podoba i jej zaufa.
            <span className="text-gray-300"> Dosyć mało, prawda?</span>
          </p>
        </section>
      </Container>

      <Section className="bg-white text-gray-900">
        <Container className="flex">
          <div className="flex flex-col gap-4 flex-2">
            <Heading level={3}>
              REM-MET - Czy start up przemysłowy może wyglądać ogólnoświatowo?
            </Heading>
            <Text>
              REM-MET to firma z ponad 20-letnim doświadczeniem w spawalnictwie,
              która stanęła przed wyzwaniem wejścia na nowy rynek. Celem
              właściciela było rozszerzenie działalności o produkcję wygrodzeń
              bezpieczeństwa dla maszyn przemysłowych, które miałyby nie tylko
              spełniać normy, lecz także budować zaufanie klientów poprzez
              solidność i indywidualne dopasowanie.
            </Text>
            <Link href="/case-study/rem-met">
              <Button variant="secondary" className="w-fit">
                Zobacz case study
              </Button>
            </Link>
          </div>
          <Image
            src="/images/case-studies/rem-met/rem-met-bus-stop.png"
            alt="Podgląd case study REM-MET"
            width={400}
            height={400}
            className="h-auto w-full flex-1"
          />
        </Container>
      </Section>

      <ContactSection />
    </div>
  );
}
