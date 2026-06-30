import HeroSection from "@/app/(landing-page)/components/HeroSection";
import OurClientsSection from "@/app/(landing-page)/components/OurClientsSection";
// import TestimonialsSection from "@/app/(landing-page)/components/TestimonialsSection";
import ContactSection from "@/app/(landing-page)/components/ContactSection";
import OurWorkSection from "./components/OurWorkSection";
import LogoBannerSection from "./components/LogoBannerSection";
import OurServicesSection from "./components/OurServicesSection";
import Preloader from "@/components/Preloader/Preloader";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Preloader />
      <HeroSection />
      <LogoBannerSection />
      <OurWorkSection />
      <OurServicesSection />
      <OurClientsSection />
      {/* <TestimonialsSection /> */}
      <ContactSection />
    </main>
  );
}
