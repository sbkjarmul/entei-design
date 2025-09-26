import Section from "@/components/Section";
import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";

interface ServiceCardProps {
  name: string;
  description: string;
  path: string;
  number: string;
}

function ServiceCard({ name, description, path, number }: ServiceCardProps) {
  return (
    <Link
      href={path}
      className="group  flex-1 md:hover:flex-2 transition-all duration-200 ease"
    >
      <article className="relative  h-[400px] bg-gray-100 p-6 cursor-pointer flex flex-1 flex-col text-gray-900 gap-4 md:hover:bg-gray-900 md:hover:text-gray-100  ">
        <span className="font-despair-time text-7xl text-gray-900 md:group-hover:text-primary">
          {number}
        </span>
        <h3 className="text-4xl font-medium">{name}</h3>
        <p>{description}</p>
        <div className="flex justify-end items-end h-full">
          <span className="uppercase md:hidden md:group-hover:block text-sm tracking-wider">
            Zobacz więcej
          </span>
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

export default function OurServicesSection() {
  return (
    <Section className="bg-white items-center px-4" id="ourwork">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row gap-10 justify-between">
          <div className="flex flex-2 flex-col gap-2 items-start ">
            <AccentText>Główne usługi</AccentText>
            <Heading
              level={2}
              className="text-5xl md:text-6xl lg:text-7xl text-gray-600 text-start"
            >
              <span className="text-gray-900">Kreatywność, </span>
              <span className="font-normal">która rozwija Twój biznes</span>
            </Heading>
          </div>

          <div className="flex flex-1 flex-col gap-8">
            <Text className="text-start">
              <b className="text-gray-600">Razem pracujemy nad Twoją marką </b>
              <span>
                Jeżeli masz pomysł na biznes, to pomogę Ci zbudować wizerunek
                dla Twojego biznesu, od nazwy, przez projekt logo, po strone
                internetową.
              </span>
            </Text>

            <Link href="/uslugi">
              <Button className="uppercase">Zobacz wszystkie usługi</Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-1">
          <ServiceCard
            number="01"
            name="Branding"
            description="Projektowanie logo, systemów wizualnych, strategia marki, które wyróżniają."
            path="/uslugi/branding"
          />

          <ServiceCard
            number="02"
            name="Projektowanie UI/UX"
            description="Aplikacje mobilne, platformy SaaS i strony biznesowe, które zwiększają sprzedaż."
            path="/uslugi/identyfikacja-wizualna"
          />

          <ServiceCard
            number="03"
            name="Web Development"
            description="Nowoczesne i ultra szybkie strony internetowe oraz aplikacje webowe w technologii React lub Next.js."
            path="/uslugi/identyfikacja-wizualna"
          />
        </div>
      </Container>
    </Section>
  );
}
