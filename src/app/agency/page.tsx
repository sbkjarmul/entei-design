import ClosingSection from "./components/ClosingSection";
import ComparisonSection from "./components/ComparisonSection";
import FaqSection from "./components/FaqSection";
import HeroSection from "./components/HeroSection";
import PricingSection from "./components/PricingSection";

/** Agency landing, served at agency.entei.pl (rewritten by src/middleware.ts). */
export default function AgencyPage() {
  return (
    <>
      <HeroSection />
      <ComparisonSection />
      <ClosingSection />
      <PricingSection />
      <FaqSection />
    </>
  );
}
