import BenchSection from "./components/BenchSection";
import ComparisonSection from "./components/ComparisonSection";
import FaqSection from "./components/FaqSection";
import HeroSection from "./components/HeroSection";
import MeetSection from "./components/MeetSection";

/** Agency landing, served at agency.entei.pl (rewritten by src/middleware.ts). */
export default function AgencyPage() {
  return (
    <>
      <HeroSection />
      <BenchSection />
      <ComparisonSection />
      <MeetSection />
      <FaqSection />
    </>
  );
}
