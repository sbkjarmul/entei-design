import Image from "next/image";
import Link from "next/link";

import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";
import Section from "@/components/Section";

export default function OurClientsSection() {
  return (
    <Section className="items-center px-8" id="ourclients">
      <div className="flex flex-col items-center gap-2">
        <AccentText>Zaufali nam</AccentText>
        <Heading level={2}>Nasi klienci</Heading>
        <Text className="text-center">
          Pomogliśmy już 20+ firmom wyglądać lepiej
        </Text>
      </div>
      <div className="grid grid-cols-2 gap-8 md:gap-16 max-w-5xl w-full">
        <Link
          href="https://art-mat.com.pl"
          target="_blank"
          className="flex justify-end items-center"
        >
          <Image
            src="/images/our-clients/art-mat-logo.png"
            alt="art-mat"
            width={400}
            height={100}
            sizes="(max-width: 768px) 300px, 500px"
            className="object-contain w-auto h-full grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
        </Link>
        <Link
          href="https://rem-met.com"
          target="_blank"
          className="flex justify-start items-center"
        >
          <Image
            src="/images/our-clients/rem-met-logo.png"
            alt="rem-met"
            width={400}
            height={100}
            sizes="(max-width: 768px) 300px, 500px"
            className="object-contain w-auto h-full grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
        </Link>
        <Link
          href="https://lagomwarsaw.com"
          target="_blank"
          className="flex justify-end items-center"
        >
          <Image
            src="/images/our-clients/lagom-logo.png"
            alt="lagom"
            width={400}
            height={100}
            sizes="(max-width: 768px) 200px, 300px"
            className="object-contain w-auto h-full grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
        </Link>
        <Link
          href="https://aristo-pharma.pl"
          target="_blank"
          className="flex justify-start items-center"
        >
          <Image
            src="/images/our-clients/aristo-logo.png"
            alt="aristo"
            width={400}
            height={100}
            sizes="(max-width: 768px) 200px, 400px"
            className="object-contain w-auto h-full grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
        </Link>
      </div>
    </Section>
  );
}
