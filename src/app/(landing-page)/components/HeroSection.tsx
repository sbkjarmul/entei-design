"use client";

import Button from "../../../components/Button";
import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  const handleBookMeeting = () => router.push("/contact");

  return (
    <section className="flex flex-col items-center justify-center text-center py-20 gap-6">
      <AccentText>100% zadowolonych klientów</AccentText>
      <Heading level={1}>Zamieniamy pomysły w nowoczesne marki</Heading>
      <Text>
        Wiemy jak tworzyć ponadczasowe logo oraz strony internetowę, którę
        budują przywiązanie już od pierwszego kontaktu z Twoją firmą!
      </Text>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button variant="secondary">Zobacz nasze realizacje</Button>
        <Button variant="primary" onClick={handleBookMeeting}>
          Umów konsultacje
        </Button>
      </div>
    </section>
  );
}
