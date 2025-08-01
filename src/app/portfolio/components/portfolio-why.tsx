import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { useTranslations } from "next-intl";

export default function PortfolioWhy() {
  const t = useTranslations("portfolio");

  return (
    <div className="bg-gray-950">
      <Container className="h-screen flex items-center justify-center z-1 px-4">
        <Heading level={2} className="text-white">
          <span className="flex flex-col gap-2">
            <span className="text-gray-500">{t("why.but")}</span>
            <span className="text-white">{t("why.title")}</span>
          </span>
        </Heading>
      </Container>

      <Container className="h-screen flex items-center justify-center z-1 px-4">
        <span className="text-center text-3xl max-w-4xl">
          <span className="text-gray-400 font-light">
            {t("why.description1")}
          </span>
          <span className="text-white font-bold">{t("why.description2")}</span>
        </span>
      </Container>
    </div>
  );
}
