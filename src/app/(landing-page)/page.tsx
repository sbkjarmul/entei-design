import HeroSection from "@/app/(landing-page)/components/HeroSection";
import OurClientsSection from "@/app/(landing-page)/components/OurClientsSection";
import ContactSection from "@/app/(landing-page)/components/ContactSection";
import OurWorkSection from "./components/OurWorkSection";
import NextStepsSection from "./components/NextStepsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <OurWorkSection />
      <NextStepsSection />
      <OurClientsSection />
      <ContactSection />
    </main>
  );
}
