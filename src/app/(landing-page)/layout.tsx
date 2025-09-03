import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(to bottom, transparent 0%, transparent 75%, rgba(0, 0, 0, 1) 100%)",
      }}
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
