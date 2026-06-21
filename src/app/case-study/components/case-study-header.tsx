import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import { headerMenu } from "@/components/Header/HeaderMenu/constants";
import { CALENDLY_URL } from "@/lib/caseStudies";

export default async function PortfolioHeader() {
  const tc = await getTranslations("caseStudyChrome");

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <Container className="flex h-[88px] max-w-none items-center justify-between px-6 md:px-10">
          <Link href="/" className="relative h-9 w-9 shrink-0">
            <Image
              src="/images/entei-logo-gray.svg"
              alt="Entei Design"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Same items as the homepage menu, frosted-glass pill. Hidden on mobile. */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/30 bg-white/50 px-2 py-1.5 backdrop-blur-md md:flex">
            {headerMenu.map((item) => {
              const href =
                item.href.startsWith("/") || item.href.startsWith("#")
                  ? item.href
                  : `/${item.href}`;
              return (
                <Link
                  key={item.href}
                  href={href}
                  className="rounded-xl px-4 py-2 text-xl font-normal text-gray-900 transition-colors hover:text-gray-500"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </Container>
      </header>

      {/*
        CTA rendered as its OWN fixed element (sibling of <header>, not nested
        inside it) so `mix-blend-difference` blends against the page content in
        the root stacking context — auto-inverting (black over light, white over
        dark). Nesting it inside the fixed <header> would isolate it and break
        the blend.
      */}
      <Link
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 top-0 z-50 flex h-[88px] items-center text-xl font-normal text-white underline decoration-1 underline-offset-8 mix-blend-difference transition-opacity hover:opacity-70 md:right-10"
      >
        {tc("wantProject")}
      </Link>
    </>
  );
}
