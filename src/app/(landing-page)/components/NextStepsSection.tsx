import Section from "@/components/Section";
import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";

export default function NextStepsSection() {
  return (
    <Section className="bg-white items-center px-4" id="ourwork">
      <div className="flex flex-col gap-2 items-center ">
        <AccentText>Skup się na swoim biznesie!</AccentText>
        <Heading
          level={2}
          className="text-5xl md:text-6xl lg:text-7xl text-gray-900 text-center"
        >
          Rozumiemy jak bardzo zajęty jesteś
        </Heading>
      </div>
      <Text className="text-center">
        Chętnie wesprzemy Cię w{" "}
        <b className="text-gray-600">regularnym tworzeniu treści </b> na Twoje
        social media, a także pozyskiwaniem klientów poprzez{" "}
        <b className="text-gray-600"> digital marketing. </b>
      </Text>
    </Section>
  );
}
