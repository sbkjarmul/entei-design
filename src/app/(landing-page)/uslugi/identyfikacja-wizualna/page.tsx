import Container from "@/components/Container";
import ContactSection from "../../components/ContactSection";

export default function VisualIdentityServicePage() {
  return (
    <div className="inset-0 flex flex-col gap-10 w-screen min-h-fit items-center justify-center p-0 md:py-8 relative overflow-hidden">
      <Container className="flex flex-col gap-10 px-4 items-center w-full">
        <span className="text-center py-20 text-2xl text-gray-700">
          Strona w budowie
        </span>
      </Container>

      <ContactSection />
    </div>
  );
}
