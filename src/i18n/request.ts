import { getRequestConfig } from "next-intl/server";

const DEFAULT_LOCALE = "pl";
const SUPPORTED_LOCALES = ["pl", "en"];

export default getRequestConfig(async ({ locale }) => {
  // `locale` is provided when translations are requested for an explicit
  // locale (e.g. getTranslations({ locale: "en" })); otherwise we use the
  // default. We deliberately do NOT await `requestLocale`: there is no locale
  // routing and no middleware, so it always resolves to `undefined` anyway —
  // but awaiting it reads request headers, which opts every page into dynamic
  // rendering (`no-store`) and sends all traffic to the origin.
  const resolved =
    locale && SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
