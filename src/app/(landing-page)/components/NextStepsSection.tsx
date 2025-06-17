import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";

export default function NextStepsSection() {
  return (
    <section
      className="bg-white py-20 flex flex-col items-center gap-10"
      id="ourwork"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 items-center">
          <AccentText>Skup się na swoim biznesie!</AccentText>
          <Heading level={2} className="lg:text-7xl text-black text-center">
            Rozumiemy jak bardzo zajęty jesteś
          </Heading>
        </div>
        <Text className="text-center">
          Chętnie wesprzemy Cię w regularnym tworzeniem treści na Twoje social
          media, a także pozyskiwaniem klientów poprzez digital marketing.
        </Text>
      </div>
    </section>
  );
}
