import HeroSection from "@/app/(landing-page)/components/HeroSection";
import OurClientsSection from "@/app/(landing-page)/components/OurClientsSection";
import ContactSection from "@/app/(landing-page)/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <OurClientsSection />
      <ContactSection />
    </main>
  );
}
