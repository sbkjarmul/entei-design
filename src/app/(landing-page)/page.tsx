import HeroSection from "@/app/(landing-page)/components/HeroSection";
import OurClientsSection from "@/app/(landing-page)/components/OurClientsSection";
import ContactSection from "@/app/(landing-page)/components/ContactSection";
import OurWorkSection from "./components/OurWorkSection";
import NextStepsSection from "./components/NextStepsSection";
import LogoBannerSection from "./components/LogoBannerSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LogoBannerSection />
      <OurWorkSection />
      {/* <WhatYouGetSection /> */}
      <NextStepsSection />
      <OurClientsSection />
      <ContactSection />
    </main>
  );
}
