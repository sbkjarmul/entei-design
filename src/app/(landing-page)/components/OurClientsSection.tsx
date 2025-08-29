import Image from "next/image";
import Link from "next/link";

import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";
import Section from "@/components/Section";

interface ClientCardProps {
  logo: string;
  name: string;
  url: string;
}

function ClientCard({ logo, name, url }: ClientCardProps) {
  return (
    <Link href={url} target="_blank" className="flex justify-end items-center">
      <div className="flex items-center justify-center p-4 rounded-lg w-full h-full backdrop-blur-sm border border-gray-900">
        <Image
          src={logo}
          alt={name}
          width={150}
          height={50}
          sizes="(max-width: 768px) 200px, 200px"
          className="object-contain grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </Link>
  );
}

export default function OurClientsSection() {
  return (
    <Section
      className="min-h-[800px] items-center px-8 relative overflow-hidden"
      id="ourclients"
    >
      <Image
        src="/images/entei-blocks.png"
        alt="Entei design studio background"
        width={1000}
        height={1000}
        className="absolute top-0 right-0 object-cover z-0"
      />

      <div className="flex flex-col items-center gap-2 z-1">
        <AccentText>Zaufali nam</AccentText>
        <Heading level={2}>Nasi klienci</Heading>
        <Text className="text-center">
          Ponad 20 firm skorzystało z naszej pomocy w projektach wizualnych
        </Text>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] gap-2 md:gap-2 max-w-5xl w-full">
        <ClientCard
          logo="/images/our-clients/art-mat-logo.png"
          name="art-mat"
          url="https://art-mat.com.pl"
        />

        <ClientCard
          logo="/images/our-clients/rem-met-logo.png"
          name="rem-met"
          url="https://www.rem-met.com"
        />

        <ClientCard
          logo="/images/our-clients/lagom-logo.png"
          name="lagom"
          url="https://www.lagomwarsaw.com"
        />

        <ClientCard
          logo="/images/our-clients/aristo-logo.png"
          name="aristo"
          url="https://aristo-pharma.pl"
        />

        <ClientCard
          logo="/images/our-clients/highwave-logo.png"
          name="highwave"
          url="https://highwavewear.pl/"
        />

        <ClientCard
          logo="/images/our-clients/hatan-logo.png"
          name="hatan"
          url="https://instagram.com/hatan_pl"
        />

        <ClientCard
          logo="/images/our-clients/suseu-logo.png"
          name="suseu"
          url="https://www.entei.pl/"
        />

        <ClientCard
          logo="/images/our-clients/ecomgo-logo.png"
          name="ecomgo"
          url="https://ecomgo.pl/"
        />
      </div>
    </Section>
  );
}
