import { getRequestConfig } from "next-intl/server";

const DEFAULT_LOCALE = "pl";
const SUPPORTED_LOCALES = ["pl", "en"];

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // `locale` is provided when translations are requested for an explicit
  // locale (e.g. getTranslations({ locale: "pl" })). Otherwise we fall back
  // to the request locale, and finally to the default locale.
  const candidate = locale ?? (await requestLocale);
  const resolved =
    candidate && SUPPORTED_LOCALES.includes(candidate)
      ? candidate
      : DEFAULT_LOCALE;

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
