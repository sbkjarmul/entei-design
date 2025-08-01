"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import Container from "@/components/Container";
import Heading from "@/components/Heading";

export default function PortfolioWhy() {
  const t = useTranslations("portfolio");

  return (
    <div className="bg-gray-950">
      <Container className=" h-screen flex items-center justify-center z-1 px-4">
        <Heading level={2} className="text-white">
          <span className="relative flex flex-col gap-2 py-2">
            <span className="text-gray-500">{t("why.but")}</span>
            <span className="text-white">{t("why.title")}</span>

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
      </Container>

      <Container className="h-screen flex items-center justify-center z-1 px-4">
        <span className="relative text-center text-3xl max-w-4xl py-2 leading-tight">
          <span className="text-gray-400 font-light">
            {t("why.description1")}
          </span>
          <span className="text-white font-bold">{t("why.description2")}</span>

          <motion.div
            initial={{ width: "100%" }}
            whileInView={{ width: "0%" }}
            transition={{ duration: 2 }}
            viewport={{ amount: "all", once: true }}
            className="absolute top-0 right-0 w-full h-1/3 bg-gray-950"
          />
          <motion.div
            initial={{ width: "100%" }}
            whileInView={{ width: "0%" }}
            transition={{ duration: 2, delay: 2 }}
            viewport={{ amount: "all", once: true }}
            className="absolute top-1/3 right-0 w-full h-1/3 bg-gray-950"
          />
          <motion.div
            initial={{ width: "100%" }}
            whileInView={{ width: "0%" }}
            transition={{ duration: 2, delay: 4 }}
            viewport={{ amount: "all", once: true }}
            className="absolute bottom-0 right-0 w-full h-1/3 bg-gray-950"
          />
        </span>
      </Container>
    </div>
  );
}
