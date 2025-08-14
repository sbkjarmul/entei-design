import Heading from "@/components/Heading";
import Text from "@/components/Text";
import TrustedUs from "./TrustedUs";
import CopyTextButton from "@/components/CopyTextButton";
import Button from "@/components/Button";
import Link from "next/link";

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-4 z-1 justify-center">
      <div className="flex flex-col">
        <TrustedUs />
        <Heading level={1}>Każdy projekt zaczyna się od wizji.</Heading>
      </div>
      <div className="flex-col flex gap-4">
        <Text>
          Odpowiadamy na Twoje zgłoszenie w ciągu 48 godzin roboczych. Jeżeli
          Twoje zgłoszenie jest pilne lub nie jesteś fanem formularzy zgłoś się
          do nas na:
        </Text>
        <Text>
          <CopyTextButton text={"hello@entei.design"} /> <span>lub </span>
          <Link
            href={"https://calendly.com/entei-designs/30min"}
            target="_blank"
          >
            <Button
              variant="text"
              className="hover:text-gray-100 cursor-pointer text-primary"
            >
              zarezerwuj rozmowę.
            </Button>
          </Link>
        </Text>
      </div>
    </div>
  );
}
