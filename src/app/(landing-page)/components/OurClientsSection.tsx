import Image from "next/image";
import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";

export default function OurClientsSection() {
  return (
    <section
      className="bg-black py-20 flex flex-col items-center gap-10"
      id="ourclients"
    >
      <div className="flex flex-col items-center gap-2">
        <AccentText>Zaufali nam</AccentText>
        <Heading level={2}>Nasi klienci</Heading>
        <Text>Pomogliśmy już 20+ firmom wyglądać lepiej</Text>
      </div>
      <div className="flex flex-col items-center gap-y-10 max-w-5xl w-full">
        <div className="flex flex-row justify-center gap-x-16 w-full">
          <div className="h-10 flex items-center justify-center">
            <Image
              src="/images/our-clients/art-mat-logo.png"
              alt="art-mat"
              width={220}
              height={40}
              className="object-contain w-auto h-full grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="h-10 flex items-center justify-center">
            <Image
              src="/images/our-clients/rem-met-logo.png"
              alt="rem-met"
              width={220}
              height={40}
              className="object-contain w-auto h-full grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="h-10 flex items-center justify-center">
            <Image
              src="/images/our-clients/lagom-logo.png"
              alt="lagom"
              width={220}
              height={40}
              className="object-contain w-auto h-full grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center gap-x-16 w-full">
          <div className="h-10 flex items-center justify-center">
            <Image
              src="/images/our-clients/aristo-logo.png"
              alt="aristo"
              width={260}
              height={40}
              className="object-contain w-auto h-full grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="h-16 flex items-center justify-center">
            <Image
              src="/images/our-clients/highwave-logo.png"
              alt="high wave"
              width={220}
              height={64}
              className="object-contain w-auto h-full grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
