"use client";

import Button from "../../../components/Button";
import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";
import { useRouter } from "next/navigation";
import Section from "@/components/Section";

export default function HeroSection() {
  const router = useRouter();

  const handleBookMeeting = () => router.push("/contact");

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
        <Button
          variant="primary"
          onClick={handleBookMeeting}
          isHero
          className="relative z-1"
        >
          <div className="absolute inset-[-4px] bg-primary/50 rounded-xl animate-pulse z-0 blur-sm" />
          <span className="z-1">Umów konsultacje</span>
        </Button>
      </div>
    </Section>
  );
}
