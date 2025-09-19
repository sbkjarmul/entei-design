"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function PortfolioProjects() {
  const t = useTranslations("portfolio");
  return (
    <section className="h-screen bg-gray-950 relative" id="projects">
      <Container className="h-screen flex flex-col items-center justify-center bg-gray-950 relative gap-20 px-4  py-10 md:py-20">
        <div className="flex flex-col items-center justify-center gap-4">
          <Heading level={2}>
            <span className="relative flex flex-col gap-0 py-2 text-5xl md:text-7xl">
              <span className="text-gray-500">{t("projects.so")}</span>
              <span className="text-white">{t("projects.howDoIWork")}</span>

              <motion.div
                initial={{ width: "100%" }}
                whileInView={{ width: "0%" }}
                transition={{ duration: 1 }}
                viewport={{ amount: "all", once: true }}
                className="absolute top-0 right-0 w-full h-1/2 bg-gray-950"
              />
              <motion.div
                initial={{ width: "100%" }}
                whileInView={{ width: "0%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ amount: "all", once: true }}
                className="absolute bottom-0 right-0 w-full h-1/2 bg-gray-950"
              />
            </span>
          </Heading>
          <motion.p
            className="text-gray-500 max-w-md text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {t("projects.description")}
          </motion.p>
        </div>
        <motion.div
          className="flex flex-col md:flex-row flex-wrap gap-20 justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <Link
            href="/case-study/suseu"
            className="opacity-50 hover:opacity-100 transition-opacity duration-300"
            target="_blank"
          >
            <Image
              src="/images/case-studies/suseu-case-study-logo.svg"
              alt="Suseu Logo"
              width={200}
              height={200}
            />
          </Link>

          <Link
            href="/case-study/rem-met"
            className="opacity-50 hover:opacity-100 transition-opacity duration-300"
            target="_blank"
          >
            <Image
              src="/images/case-studies/rem-met-case-study-logo.svg"
              alt="REM-MET Project"
              width={250}
              height={200}
            />
          </Link>

          <Link
            href="/case-study/ceramido"
            className="opacity-50 hover:opacity-100 transition-opacity duration-300"
            target="_blank"
          >
            <Image
              src="/images/case-studies/ceramido-case-study-logo.svg"
              alt="Ceramido Project"
              width={250}
              height={200}
            />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
