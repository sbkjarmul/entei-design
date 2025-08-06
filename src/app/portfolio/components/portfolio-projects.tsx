import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";

export default function PortfolioProjects() {
  return (
    <section className="h-screen bg-gray-950 relative">
      <Container className="h-screen flex flex-col items-center justify-center bg-gray-950 relative gap-20 px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <Heading level={2}>
            <span className="relative flex flex-col gap-0 py-2 text-5xl md:text-7xl">
              <span className="text-gray-500">So...</span>
              <span className="text-white">How do I work?</span>
            </span>
          </Heading>
          <p className="text-gray-500 max-w-md text-center">
            Explore the results of my work through detailed case studies or
            live, fully launched websites.
          </p>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap gap-20 justify-center items-center">
          <Link
            href="/case-study/suseu"
            className="opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src="/images/case-studies/suseu-case-study-logo.svg"
              alt="Suseu Logo"
              width={200}
              height={200}
            />
          </Link>

          <Link
            href="https://www.rem-met.com"
            className="opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src="/images/case-studies/rem-met-case-study-logo.svg"
              alt="REM-MET Project"
              width={250}
              height={200}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
