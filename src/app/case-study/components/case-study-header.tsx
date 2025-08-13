import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";

export default function PortfolioHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background/95">
      <Container className="h-[100px] flex items-center justify-between px-8 max-w-none">
        <Link href="/portfolio" className="relative h-10 w-10">
          <Image
            src="/images/entei-logo-gray.svg"
            alt="Entei Design"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </Container>
    </header>
  );
}
