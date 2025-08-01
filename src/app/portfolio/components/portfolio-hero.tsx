import { useTranslations } from "next-intl";
import Image from "next/image";

import Container from "@/components/Container";
import Heading from "@/components/Heading";

function PortfolioHeroShadow() {
  return (
    <div className="w-full h-full absolute bottom-0 left-0 bg-gradient-to-b from-transparent from-0% via-transparent via-75% to-black to-100% z-1" />
  );
}

export default function PortfolioHero() {
  const t = useTranslations("portfolio");

  return (
    <section className="w-full h-screen bg-[#0C0C0C] relative max-h-[1000px]">
      <PortfolioHeroShadow />

      <Image
        src="/images/portfolio/entei-pattern.svg"
        alt="Entei Pattern"
        width={1080}
        height={1080}
        className="object-cover absolute bottom-0 left-1/2 h-full w-1/2 mix-blend-color-dodge"
        priority
      />

      <Container className="relative h-full z-2">
        <div className="w-full h-full flex flex-col items-start justify-end">
          <div className="absolute top-1/3 left-0 w-[450px] flex flex-col items-start justify-end gap-4">
            <div className="flex items-center gap-2 py-2 px-4 border border-gray-800 rounded-full  bg-gray-900">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
              <span className="text-white">{t("hero.available")}</span>
            </div>

            <Heading level={1} className="text-white">
              {t("hero.title")}
            </Heading>
          </div>

          <div className="absolute top-1/3 left-2/3 p-3 border border-gray-800 rounded-tl-4xl rounded-tr-4xl rounded-br-4xl rounded-bl-0  bg-gray-900 flex items-start justify-start gap-2 w-[320px] shadow-2xl">
            <div className="p-2 min-w-10 min-h-10 bg-black rounded-full flex items-center justify-center">
              <Image
                src="/images/portfolio/entei-logo.svg"
                alt="ENTEI Logo in avatar"
                width={20}
                height={20}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col gap-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">
                  {t("hero.entei")}
                </span>
                <span className="text-gray-600 font-light">
                  {t("hero.now")}
                </span>
              </div>
              <span className="text-xl font-light">{t("hero.comment")}</span>
            </div>
          </div>

          <PortfolioHeroShadow />

          <Image
            src="/images/portfolio/entei-me-in-glasses.png"
            alt="ENTEI owner in glasses"
            width={1600}
            height={1000}
            className="object-contain z-0"
            priority
          />

          <Image
            src="/images/portfolio/entei-hero-text.svg"
            alt="Entei Wordmark"
            width={1600}
            height={400}
            className="object-contain absolute bottom-0 z-2"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
