"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";

function PortfolioHeroShadow() {
  return (
    <div className="w-full h-full absolute bottom-0 left-0 bg-gradient-to-b from-transparent from-0% via-transparent via-75% to-black to-100% z-1" />
  );
}

function PortfolioHeroText() {
  const t = useTranslations("portfolio");

  return (
    <div className="flex flex-col items-start justify-end gap-4">
      <div className="flex items-center gap-2 py-2 px-4 border border-gray-800 rounded-full bg-gray-900">
        <div className="relative w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)]">
          <div className="absolute top-0 left-0 w-full h-full bg-primary rounded-full animate-ping" />
        </div>
        <span className="text-white">{t("hero.available")}</span>
      </div>

      <Heading level={1} className="text-white font-light">
        {t("hero.title")}
      </Heading>
    </div>
  );
}

function PortfolioHeroFigmaComment() {
  const t = useTranslations("portfolio");

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-3 border border-gray-800 rounded-tl-4xl rounded-tr-4xl rounded-br-4xl rounded-bl-0  bg-gray-900 flex items-start justify-start gap-2 w-[320px] shadow-2xl"
    >
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
          <span className="text-white font-medium">{t("hero.entei")}</span>
          <span className="text-gray-600 font-light">{t("hero.now")}</span>
        </div>
        <span className="text-xl font-light relative">
          {t("hero.comment")}
          <motion.div
            animate={{ width: "0%" }}
            initial={{ width: "100%" }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute top-0 right-0 w-full h-1/2 bg-gray-900"
          />
          <motion.div
            animate={{ width: "0%" }}
            initial={{ width: "100%" }}
            transition={{ delay: 3, duration: 2 }}
            className="absolute bottom-0 right-0 w-full h-1/2 bg-gray-900"
          />
        </span>
      </div>
    </motion.div>
  );
}

export default function PortfolioHero() {
  return (
    <section className="w-full h-screen bg-[#0C0C0C] relative max-h-[600px] md:max-h-[1000px]">
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
        <div className="w-full h-full flex flex-col items-start justify-end gap-10">
          <div className="hidden md:block absolute top-1/3 left-0 w-[400px] pl-4">
            <PortfolioHeroText />
          </div>

          <div className="hidden md:block absolute md:top-1/4 lg:top-1/3 md:left-3/5 lg:left-2/3 ">
            <PortfolioHeroFigmaComment />
          </div>

          <div className="block md:hidden px-4">
            <PortfolioHeroText />
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
