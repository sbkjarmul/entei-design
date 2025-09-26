import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Link from "next/link";
import ContactSection from "../../components/ContactSection";
import Text from "@/components/Text";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Image from "next/image";

interface ServiceCardProps {
  name: string;
  description: string;
  path: string;
  number: string;
  flexSpace: number;
}

function ServiceCard({
  name,
  description,
  path,
  number,
  flexSpace = 1,
}: ServiceCardProps) {
  return (
    <Link
      href={path}
      className={`text-sm  md:hover:bg-gray-900 md:hover:text-gray-100 md:hover:flex-${flexSpace * 2} transition-all duration-200 ease flex-${flexSpace}`}
    >
      <article
        className={`relative group h-[200px] md:h-[300px] bg-gray-950 p-6 cursor-pointer flex flex-col text-gray-100 gap-4 `}
      >
        <span className="font-despair-time text-4xl text-gray-700 md:group-hover:text-primary">
          {number}
        </span>
        <h3 className="text-2xl text-gray-300 font-medium uppercase tracking-wider">
          {name}
        </h3>
        <p className="text-gray-700 group-hover:text-gray-500">{description}</p>
        <div className="absolute top-0 right-0 flex justify-end items-start h-full hidden w-24 group-hover:flex bg-transparent">
          <div className="w-4 h-full bg-primary" />
        </div>

        <div className="absolute bottom-4 left-4 flex justify-end items-end h-full hidden w-auto group-hover:flex bg-transparent">
          <Image
            src="/images/icons/orange-plus-icon.svg"
            alt="Plus Icon"
            width="24"
            height="24"
            className="z-2"
          />
        </div>
      </article>
    </Link>
  );
}

function Divider() {
  return <div className="border border-solid border-gray-800" />;
}

export default function BrandingServicePage() {
  return (
    <div className="inset-0 flex flex-col gap-10 w-screen min-h-fit items-center justify-center p-0 md:py-8 relative overflow-hidden">
      <Container className="flex flex-col gap-10">
        <section className="max-w-xl my-20">
          <Heading level={1} className="leading-5 ">
            <span className="text-5xl font-light text-gray-500">
              <span className="font-medium text-gray-100 ">Branding, </span>
              czyli jak postrzegają Cie klienci.
            </span>
          </Heading>
        </section>

        <Divider />

        <div className="flex flex-col gap-8">
          <div className="flex gap-1">
            <ServiceCard
              number="01"
              name="Identyfikacja Wizualna"
              description="Logo, Kolory i czcionki, Elementy Graficzne, Księga Znaku"
              path="/uslugi/identyfikacja-wizualna"
              flexSpace={1}
            />

            <ServiceCard
              number="02"
              name="Strategia Marki"
              description="Definiujemy Twoją grupę docelowa i konkurencje, misja, propozycja wartości oraz przeprowadzamy analize SWOT. W skrócie analizujemy Twój biznes i proponujemy strategie, która wzmocni jego pozycję na rynku."
              path="/#branding"
              flexSpace={1}
            />

            <ServiceCard
              number="03"
              name="Styl komunikacji"
              description="Nazwa Marki, Ton głosu, Osobowość Marki, Slogan"
              path="/#branding"
              flexSpace={1}
            />
          </div>
        </div>

        <Divider />
      </Container>

      <Section className="bg-white text-gray-900">
        <Container className="flex gap-10">
          <div className="flex flex-col gap-4 flex-2">
            <Heading level={3}>
              REM-MET - Czy start-up przemysłowy może wyglądać ogólnoświatowo?
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
