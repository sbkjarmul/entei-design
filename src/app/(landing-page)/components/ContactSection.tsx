"use client";

import AccentText from "@/components/AccentText";
import Heading from "@/components/Heading";
import CopyTextButton from "@/components/CopyTextButton";
import Section from "@/components/Section";

export default function ContactSection() {
  const email = "hello@entei.design";

  return (
    <Section className="items-center">
      <div className="flex flex-col items-center gap-2">
        <AccentText>Stwórzmy razem projekt</AccentText>
        <Heading level={2}>Wyślij nam email</Heading>
        <CopyTextButton text={email} />
      </div>
    </Section>
  );
}
