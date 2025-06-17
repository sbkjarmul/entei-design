"use client";

import AccentText from "@/components/AccentText";
import Heading from "@/components/Heading";
import CopyTextButton from "@/components/CopyTextButton";

export default function ContactSection() {
  const email = "hello@entei.design";

  return (
    <section className="bg-black py-20 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <AccentText>Stwórzmy razem projekt</AccentText>
        <Heading level={2}>Wyślij nam email</Heading>
        <CopyTextButton text={email} />
      </div>
    </section>
  );
}
