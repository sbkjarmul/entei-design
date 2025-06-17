import CaseStudyCard from "@/components/CaseStudyCard";
import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";

export default function OurWorkSection() {
  return (
    <section
      className="bg-black py-20 flex flex-col items-center gap-10"
      id="ourwork"
    >
      {/* <div className="flex flex-col items-center gap-2">
        <AccentText>Case studies</AccentText>
        <Heading level={2}>Nasze realizacje</Heading>
        <Text>Sprawdź nad czym ostatnio pracowaliśmy</Text>
      </div> */}

      <div className="flex flex-col p-4 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <CaseStudyCard
            categories={[
              "Branding",
              "Nazwa",
              "Aplikacja mobilna",
              "Aplikacja webowa",
            ]}
            image="/images/case-studies/suseu-case-study-card.png"
            logo="/images/our-clients/suseu-logo.png"
            title="Stworzyliśmy ponad 300 widoków w wersji web i mobile dla Suseu, aplikacji do zarządzania współpracami "
            comingSoon={true}
            size="small"
          />

          <CaseStudyCard
            categories={[
              "Identyfikacja wizualna",
              "Nazwy produktów",
              "Strona internetowa",
            ]}
            image="/images/case-studies/rem-met-case-study-card.png"
            logo="/images/our-clients/rem-met-logo.png"
            title="Zaprojektowaliśmy pełny system wizualny dla polskiego producenta wygrodzeń przemysłowych"
            comingSoon={true}
            size="small"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <CaseStudyCard
            categories={["Branding", "Strona internetowa"]}
            image="/images/case-studies/art-mat-case-study-card.png"
            logo="/images/our-clients/art-mat-logo.png"
            title="Pomogliśmy w rebrandingu naszego klienta z branży automotive"
            comingSoon={true}
            size="small"
          />

          <CaseStudyCard
            categories={["Branding", "Opakowania produktowe"]}
            image="/images/case-studies/ceramido-case-study-card.png"
            logo="/images/our-clients/ceramido-logo.png"
            title="Zaprojektowaliśmy marke suplementów dla kobiet"
            comingSoon={true}
            size="small"
          />

          <CaseStudyCard
            categories={["Branding"]}
            image="/images/case-studies/hatan-case-study-card.png"
            logo="/images/our-clients/hatan-logo.png"
            title="Branding społeczności stworzonej dla fanów muzyki elektronicznej"
            comingSoon={true}
            size="small"
          />
        </div>
      </div>
    </section>
  );
}
