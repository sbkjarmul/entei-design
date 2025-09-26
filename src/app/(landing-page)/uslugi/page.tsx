import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Link from "next/link";
import Image from "next/image";
import ContactSection from "../components/ContactSection";

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
      className={`uppercase text-sm tracking-wider md:hover:bg-gray-900 md:hover:text-gray-100 md:hover:flex-${flexSpace * 2} transition-all duration-200 ease flex-${flexSpace}`}
    >
      <article
        className={`relative group h-[300px] md:h-[400px] bg-gray-950 p-6 cursor-pointer flex flex-col text-gray-100 gap-4 `}
      >
        <span className="font-despair-time text-7xl text-gray-700 md:group-hover:text-primary">
          {number}
        </span>
        <h3 className="text-4xl text-gray-300 font-medium">{name}</h3>
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

export default function ServicesPage() {
  return (
    <div className="inset-0 flex flex-col gap-10 w-screen min-h-fit items-center justify-center p-0 md:p-8 relative overflow-hidden">
      <Container className="flex flex-col gap-10">
        <div className="max-w-lg my-20">
          <Heading level={1} className="leading-5 ">
            <span className="text-5xl font-light text-gray-500">
              <span>Zbudujemy </span>
              <span className="font-medium text-gray-100 ">razem </span>
              markę, którą klienci zapamiętają.
            </span>
          </Heading>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <ServiceCard
              number="01"
              name="Branding"
              description="Projektowanie logo, identyfikacja wizualna, strategia marki, które wyróżniają."
              path="/uslugi/branding"
              flexSpace={1}
            />

            <ServiceCard
              number="02"
              name="Projektowanie UI/UX"
              description="Aplikacje mobilne, platformy SaaS i strony www, które zwiększają sprzedaż."
              path="/uslugi/identyfikacja-wizualna"
              flexSpace={2}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <ServiceCard
              number="03"
              name="Brand Experience"
              description="Projektowanie opakowań, materiałów promocyjnych i merchu, które wzmacniają wizerunek marki i budują jej rozpoznawalność."
              path="/uslugi/identyfikacja-wizualna"
              flexSpace={1}
            />{" "}
            <ServiceCard
              number="04"
              name="Digital Marketing"
              description="Skuteczne kampanie online, SEO i social media, które zwiększają widoczność marki i przyciągają nowych klientów."
              path="/uslugi/identyfikacja-wizualna"
              flexSpace={1}
            />
            <ServiceCard
              number="05"
              name="Web Development"
              description="Nowoczesne i ultra szybkie strony internetowe oraz aplikacje webowe w technologii React lub Next.js."
              path="/uslugi/identyfikacja-wizualna"
              flexSpace={2}
            />
          </div>
        </div>
      </Container>
      <ContactSection />
    </div>
  );
}
