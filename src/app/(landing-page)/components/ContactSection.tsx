"use client";

import AccentText from "@/components/AccentText";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Text from "@/components/Text";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";

export default function ContactSection() {
  return (
    <Section className="items-center min-h-[400px] justify-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <AccentText>Stwórzmy razem projekt</AccentText>
        <Heading className="max-w-8xl" level={2}>
          Twoja firma potrzebuje nowego wizerunku?
        </Heading>
        <div className="flex-col flex gap-4">
          <Text>
            Napisz do nas maila lub skorzystaj z
            <Link href={"/contact"}>
              <Button
                variant="text"
                className="hover:text-gray-100 cursor-pointer text-primary"
              >
                <span className="ml-1">formularza kontaktowego!</span>
              </Button>
            </Link>
          </Text>
          <Link
            href={"https://calendly.com/entei-designs/30min"}
            target="_blank"
            className="mt-10"
          >
            <Button>
              Zarezerwuj rozmowę{" "}
              <Image
                src="/images/icons/arrow-icon-black.svg"
                alt="Arrow Icon"
                width="20"
                height="20"
                className="z-2"
              />
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
