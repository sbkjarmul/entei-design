import Container from "@/components/Container";
import PortfolioAccentText from "./portfolio-accent-text";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { useTranslations } from "next-intl";
import Image from "next/image";

function ArrowRightIcon() {
  return (
    <div className="w-10 h-10 bg-gray-900 rounded-lg flex justify-center items-center">
      <Image
        src="/images/icons/arrow-icon.svg"
        alt="Arrow Icon"
        width="24"
        height="24"
      />
    </div>
  );
}

interface PortfolioAboutMeStatsProps {
  title: string;
  value: string;
}

function PortfolioAboutMeStats({ title, value }: PortfolioAboutMeStatsProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-primary text-8xl font-despair-time">{value}</span>
      <span className="text-gray-500 text-lg font-light">{title}</span>
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
    <div className="h-screen flex items-center justify-center bg-gray-950 relative">
      <PortfolioAboutMeShadow />
      <Container className="flex items-center justify-between z-1 px-4">
        <div className="max-w-4xl gap-10 flex flex-col w-1/2">
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
            <Button className="pl-4 pr-2 py-2">
              <span className="flex items-center gap-10 font-bold tracking-tight">
                {t("aboutMe.cta")}
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </div>

        <div className="w-1/3 h-full flex flex-col gap-10">
          <PortfolioAboutMeStats
            title={t("aboutMe.stats.frontend")}
            value="4"
          />
          <PortfolioAboutMeStats
            title={t("aboutMe.stats.branding")}
            value="3"
          />
          <PortfolioAboutMeStats title={t("aboutMe.stats.uiux")} value="2" />
        </div>
      </Container>
    </div>
  );
}
