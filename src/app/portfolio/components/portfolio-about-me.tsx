"use client";

import Container from "@/components/Container";
import PortfolioAccentText from "./portfolio-accent-text";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function ArrowRightIcon() {
  return (
    <motion.div className="w-10 h-10 bg-gray-900 rounded-lg flex justify-center items-center relative">
      <Image
        src="/images/icons/arrow-icon.svg"
        alt="Arrow Icon"
        width="24"
        height="24"
        className="z-2"
      />
    </motion.div>
  );
}

interface PortfolioAboutMeStatsProps {
  title: string;
  value: string;
  delay?: number;
}

function PortfolioAboutMeStats({
  title,
  value,
  delay = 0,
}: PortfolioAboutMeStatsProps) {
  return (
    <div className="flex flex-row md:flex-col items-end md:items-start gap-4 md:gap-2">
      <motion.span
        className="text-primary leading-[90px] text-9xl md:text-8xl font-despair-time"
        initial={{ color: "#212121" }}
        whileInView={{ color: "#FF2400" }}
        transition={{ duration: 1, delay }}
      >
        {value}
      </motion.span>
      <motion.span
        initial={{ color: "#212121" }}
        whileInView={{ color: "#9e9e9e" }}
        transition={{ duration: 1, delay }}
        className="text-gray-500 text-lg font-light"
      >
        {title}
      </motion.span>
    </div>
  );
}

function PortfolioAboutMeShadow() {
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-black from-0% via-transparent via-50% to-transparent to-100% z-1" />
  );
}

export default function PortfolioAboutMe() {
  const t = useTranslations("portfolio");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative py-20">
      <PortfolioAboutMeShadow />
      <Container className="flex flex-col md:flex-row items-center justify-between z-1 px-4 gap-16 md:gap-4">
        <div className="max-w-4xl gap-10 flex flex-col w-full md:w-1/2">
          <div>
            <PortfolioAccentText>{t("aboutMe.accent")}</PortfolioAccentText>
            <Heading level={2} className="text-white">
              {t("aboutMe.title")}
            </Heading>
          </div>
          <div className="flex flex-col gap-4 text-gray-400 font-light">
            <p>{t("aboutMe.description1")}</p>
            <p>{t("aboutMe.description2")}</p>
          </div>

          <div className="flex justify-between items-center w-full gap-2">
            <Link href="#projects" className="relative">
              <Button className="pl-4 pr-2 py-2">
                <span className="flex items-center gap-10 font-bold tracking-tight">
                  {t("aboutMe.cta")}
                  <ArrowRightIcon />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          className="absolute top-0 right-0 bottom-0 w-full h-full bg-primary z-3"
          initial={{ width: "100%" }}
          whileInView={{ width: "0%" }}
          transition={{ duration: 1, delay: 2 }}
        />

        <div className="w-full md:w-1/3 h-full flex flex-col gap-10">
          <PortfolioAboutMeStats
            title={t("aboutMe.stats.frontend")}
            value="4"
            delay={3}
          />
          <PortfolioAboutMeStats
            title={t("aboutMe.stats.branding")}
            value="3"
            delay={4}
          />
          <PortfolioAboutMeStats
            title={t("aboutMe.stats.uiux")}
            value="2"
            delay={5}
          />
        </div>
      </Container>
    </div>
  );
}
