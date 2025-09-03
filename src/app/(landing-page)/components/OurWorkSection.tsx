import CaseStudyCard from "@/components/CaseStudyCard";
import Section from "@/components/Section";
import Link from "next/link";

export default function OurWorkSection() {
  return (
    <Section className="bg-black items-center px-0 sm:px-8" id="ourwork">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/case-study/suseu" target="_blank" className="w-full">
            <CaseStudyCard
              categories={[
                "Branding",
                "Nazwa",
                "Aplikacja mobilna",
                "Aplikacja webowa",
              ]}
              image="/images/case-studies/suseu-case-study-card.png"
              logo="/images/our-clients/suseu-logo.png"
              title="Stworzyliśmy ponad 300 widoków w wersji web i mobile dla Suseu, aplikacji typu SaaS"
              comingSoon={true}
              size="small"
            />
          </Link>

          <Link
            href="https://www.rem-met.com"
            target="_blank"
            className="w-full"
          >
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
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="https://art-mat.com.pl"
            target="_blank"
            className="w-full"
          >
            <CaseStudyCard
              categories={["Branding", "Strona internetowa"]}
              image="/images/case-studies/art-mat-case-study-card.png"
              logo="/images/our-clients/art-mat-logo.png"
              title="Pomogliśmy w rebrandingu naszego klienta z branży automotive"
              comingSoon={true}
              size="small"
            />
          </Link>

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
    </Section>
  );
}
