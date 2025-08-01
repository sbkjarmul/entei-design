"use client";
import Image from "next/image";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { sendGtmSuccessEvent } from "@/lib/gtm";

export default function ContactFormSuccessMessage() {
  const router = useRouter();

  useEffect(() => {
    sendGtmSuccessEvent();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full  gap-6">
      <div className="relative h-[200px] w-[200px]">
        <Image
          src="/images/icons/success-pixel-icon.svg"
          alt="success icon"
          fill
        />
      </div>
      <Heading level={1} className="text-center">
        Dziękujemy
      </Heading>
      <Text className="text-center">
        Wypełniłeś formularz kontaktowy. Odezwiemy się wkrótce!
      </Text>
      <Button onClick={() => router.push("/")}>Wracam do strony głównej</Button>
    </div>
  );
}
