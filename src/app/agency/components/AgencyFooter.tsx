import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function AgencyFooter() {
  const t = await getTranslations("agency");

  return (
    <footer className="t-body flex flex-col gap-16 bg-primary p-4 font-medium leading-compact tracking-normal text-gray-900 md:gap-80">
      <p className="max-w-[363px]">{t("footer.tagline")}</p>

      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <Image
          src="/images/agency/entei-wordmark-footer.svg"
          alt={t("logoAlt")}
          width={723}
          height={154}
          className="h-auto w-full md:mt-1 md:w-[723px]"
        />
        <p className="flex flex-col">
          <span>{t("footer.studioLine1")}</span>
          <span>{t("footer.studioLine2")}</span>
          <span>{t("footer.studioLine3")}</span>
        </p>
      </div>
    </footer>
  );
}
