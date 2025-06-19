"use client";

import AccentText from "@/components/AccentText";
import Text from "@/components/Text";
import Heading from "@/components/Heading";
import Section from "@/components/Section";

export default function WhatYouGetSection() {
  return (
    <Section className="items-start px-8 w-full">
      <div className="flex flex-col items-start gap-2">
        <AccentText>Dlaczego ENTEI?</AccentText>
        <Heading level={2}>Co zyskujesz we wspólpracy z ENTEI?</Heading>

        <section className="grid">
          <aside className="flex flex-col items-start justify-end p-4 border border-gray-500 rounded-xl aspect-square w-full">
            <Text>Spokój</Text>
            <Heading level={3}>Nie musisz martwić się o efekt końcowy.</Heading>
            <Text className="text-start">
              W każdy projekt wkładamy 100% — niezależnie od jego skali. Dbamy o
              jakość, bo sami chcemy być dumni z tego, co tworzymy.
            </Text>
          </aside>
          <aside className="flex flex-col items-start justify-end p-4 border border-gray-500 rounded-xl aspect-square w-full">
            <Text>Spokój</Text>
            <Heading level={3}>Nie musisz martwić się o efekt końcowy.</Heading>
            <Text className="text-start">
              W każdy projekt wkładamy 100% — niezależnie od jego skali. Dbamy o
              jakość, bo sami chcemy być dumni z tego, co tworzymy.
            </Text>
          </aside>
        </section>
      </div>
      <section className="flex flex-col items-center text-center w-full pt-20">
        <Heading level={3} className="text-gray-300 font-bold">
          Dodatkowo...
        </Heading>
        <Heading level={4} className="text-gray-400">
          ...współpraca nie musi zakończyć się na projekcie loga, czy stronie
          internetowej!
        </Heading>
      </section>
    </Section>
  );
}
