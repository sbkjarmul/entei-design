import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealFooter from "@/components/RevealFooter";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Czarna warstwa treści — nieprzezroczysta i ZAWSZE ponad stopką (z-30,
          wyraźnie wyżej niż własny z-10 stopki), ślizga się po przypiętej stopce
          w pełnej prędkości scrolla. */}
      <div
        className="relative z-30 min-h-screen flex flex-col bg-black"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 0%, transparent 75%, rgba(0, 0, 0, 1) 100%)",
        }}
      >
        <Header />
        <main className="flex-grow">{children}</main>
      </div>
      <RevealFooter bgClassName="bg-primary">
        <Footer />
      </RevealFooter>
    </>
  );
}
