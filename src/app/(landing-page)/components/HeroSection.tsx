"use client";

import Link from "next/link";
import Image from "next/image";

import Button from "../../../components/Button";
import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";
import Section from "@/components/Section";

export default function HeroSection() {
  return (
    <Section id="hero" className="items-center justify-center text-center px-6">
      <div className="flex flex-col gap-2 items-center">
        <AccentText>100% zadowolonych klientów</AccentText>
        <Heading level={1}>
          <span className="block md:hidden">
            Pomagamy firmom wyglądać profesjonalnie.
          </span>
          <span className="hidden md:block">
            Sprawimy, że Twoja firma, przyciągnie więcej klientów.
          </span>
        </Heading>
      </div>
      <Text>
        <span className="block md:hidden max-w-md">
          Tworzymy ponadczasowe logo oraz strony internetowe, które są
          niezbędne, aby klienci wybrali Ciebie.
        </span>
        <span className="hidden md:block">
          Wiemy jak tworzyć ponadczasowe logo oraz strony internetowę, które
          klienci zapamiętają już od pierwszego kontaktu z Twoją firmą!
        </span>
      </Text>
      <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
        <Link href={"https://calendly.com/entei-designs/30min"} target="_blank">
          <Button className="relative z-1">
            <div className="absolute inset-[-4px] bg-primary/50 rounded-xl animate-pulse z-0 blur-sm" />{" "}
            <span className="z-1">Umów konsultację</span>
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
    </Section>
  );
}
