import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import PaymentMethods from "./order/PaymentMethods";

/**
 * Legal links required by PayU's shop guidelines: each topic gets its own
 * clearly named link (a lone "Regulamin" link is not enough). They live on the
 * main site; on agency.entei.pl the middleware forwards them there.
 */
const LEGAL_LINKS = [
  { key: "terms", href: "/regulamin" },
  { key: "company", href: "/zasady-zakupow#dane-firmy" },
  { key: "payments", href: "/zasady-zakupow#platnosci" },
  { key: "fulfilment", href: "/zasady-zakupow#realizacja" },
  { key: "withdrawal", href: "/zasady-zakupow#odstapienie" },
  { key: "complaints", href: "/zasady-zakupow#reklamacje" },
  { key: "privacy", href: "/polityka-prywatnosci" },
] as const;

export default async function AgencyFooter() {
  const t = await getTranslations("agency");

  return (
    <footer className="t-body flex flex-col gap-16 bg-primary p-4 font-medium leading-compact tracking-normal text-gray-900 md:gap-40">
      <p className="max-w-[363px]">{t("footer.tagline")}</p>

      <div className="flex flex-col gap-10">
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

        <div className="t-caption flex flex-col gap-6 border-t border-ink/20 pt-6 md:flex-row md:items-start md:justify-between tracking-normal font-medium">
          <div className="flex max-w-[480px] flex-col gap-1">
            <p className="font-semibold">{t("footer.legal.sellerLabel")}</p>
            {(t.raw("footer.legal.seller") as string[]).map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>{t("footer.legal.contact")}</p>
          </div>

          <nav aria-label={t("footer.legal.links.terms")}>
            <ul className="flex flex-col gap-1">
              {LEGAL_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="underline underline-offset-2 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {t(`footer.legal.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <PaymentMethods tone="dark" />
        </div>
      </div>
    </footer>
  );
}
