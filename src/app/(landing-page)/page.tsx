import HeroSection from "@/app/(landing-page)/components/HeroSection";
import OurClientsSection from "@/app/(landing-page)/components/OurClientsSection";
import ContactSection from "@/app/(landing-page)/components/ContactSection";
import OurWorkSection from "./components/OurWorkSection";
import LogoBannerSection from "./components/LogoBannerSection";
import OurServicesSection from "./components/OurServicesSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LogoBannerSection />
      <OurWorkSection />
      <OurServicesSection />
      <OurClientsSection />
      <ContactSection />
    </main>
  );
}
