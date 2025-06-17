import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";

export default function OurWorkSection() {
  return (
    <section
      className="bg-black py-20 flex flex-col items-center gap-10"
      id="ourwork"
    >
      <div className="flex flex-col items-center gap-2">
        <AccentText>Case studies</AccentText>
        <Heading level={2}>Nasze realizacje</Heading>
        <Text>Sprawdź nad czym ostatnio pracowaliśmy</Text>
      </div>

      <div></div>
    </section>
  );
}
