import Container from "@/components/Container";
import Image from "next/image";

export default function PortfolioSuseuCaseStudy() {
  return (
    <section className="min-h-screen bg-gray-800 relative md:py-16">
      <Container className="md:shadow-[0_0_24px_rgba(0,0,0,0.9)] md:border-l md:border-r md:border-t border-gray-700">
        <div className="relative w-full h-auto ">
          <Image
            src="/images/case-studies/suseu/suseu-overview.png"
            alt="Suseu Case Study"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="relative w-full h-auto">
          <Image
            src="/images/case-studies/suseu/suseu-design-process.png"
            alt="Suseu Case Study"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>

        <div className="relative w-full h-auto">
          <Image
            src="/images/case-studies/suseu/suseu-market-research.png"
            alt="Suseu Case Study"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>

        <div className="relative w-full h-auto">
          <Image
            src="/images/case-studies/suseu/suseu-mobile-user-persona.png"
            alt="Suseu Case Study"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </Container>
    </section>
  );
}
