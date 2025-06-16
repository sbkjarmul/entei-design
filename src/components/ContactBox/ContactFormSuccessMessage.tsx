"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import { useRouter } from "next/navigation";

export default function ContactFormSuccessMessage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-start h-full gap-10">
      <Heading level={1}>Dziekuję.</Heading>
      <Text>Wypełniłeś formularz kontaktowy. Odezwiemy się wkrótce!</Text>
      <Button onClick={() => router.push("/")}>Wracam do strony głównej</Button>
    </div>
  );
}
