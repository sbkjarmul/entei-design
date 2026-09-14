import Image from "next/image";
import { getTranslations } from "next-intl/server";

import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  PRIVACY_POLICY_URL,
} from "@/lib/agency";

import ManageCookiesButton from "./ManageCookiesButton";

export default async function AgencyFooter() {
  const t = await getTranslations("agency");

  return (
    <footer className="t-body flex flex-col gap-16 bg-primary p-4 font-medium leading-compact tracking-normal text-gray-900 md:gap-80">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[363px]">{t("footer.tagline")}</p>

        <nav className="flex justify-between gap-10 whitespace-nowrap md:justify-start md:gap-24">
          <ul className="flex flex-col">
            <li>
              <a href={PRIVACY_POLICY_URL} className="hover:opacity-70">
                {t("footer.privacy")}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:opacity-70">
                {t("footer.contact")}
              </a>
            </li>
          </ul>
          <ul className="flex flex-col md:items-end">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70"
              >
                {t("footer.instagram")}
              </a>
            </li>
            <li>
              <ManageCookiesButton label={t("footer.cookies")} />
            </li>
          </ul>
        </nav>
      </div>

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
