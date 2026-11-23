import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { AGENCY_PATH, AGENCY_URL } from "@/lib/agency";
import { COMPANY, COMPANY_ADDRESS } from "@/lib/company";
import {
  PRODUCTS,
  PRODUCT_IDS,
  formatPln,
  grossAmount,
  isProductId,
} from "@/lib/payu/products";

import AgencyHeader from "../../components/AgencyHeader";
import OrderForm from "../../components/order/OrderForm";
import PaymentMethods from "../../components/order/PaymentMethods";

interface PageProps {
  params: Promise<{ product: string }>;
}

export function generateStaticParams() {
  return PRODUCT_IDS.map((product) => ({ product }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { product } = await params;
  if (!isProductId(product)) return {};
  const t = await getTranslations("agency.order");
  const url = `${AGENCY_URL}/zamowienie/${product}`;

  return {
    title: {
      absolute: t("meta.title", { product: t(`products.${product}.name`) }),
    },
    description: t("meta.description"),
    alternates: { canonical: url },
    robots: { index: false, follow: true },
  };
}

/**
 * Order page: everything the Consumer Rights Act and PayU require before the
 * buyer commits (description, gross price, duration, extra costs, seller) next
 * to the order form that hands off to PayU.
 */
export default async function OrderPage({ params }: PageProps) {
  const { product: productId } = await params;
  if (!isProductId(productId)) notFound();

  const t = await getTranslations("agency.order");
  const messages = (await getMessages()) as {
    agency: { order: { form: unknown; errors: unknown } };
  };
  const product = PRODUCTS[productId];
  const gross = grossAmount(product.netAmount);
  const priceValues = {
    gross: formatPln(gross),
    net: formatPln(product.netAmount),
    total: formatPln(gross * product.periods),
  };
  const includes = t.raw(`products.${productId}.includes`) as string[];
  const terms = (t.raw(`products.${productId}.terms`) as string[]).map((term) =>
    term.replace(
      /\{(gross|net|total)\}/g,
      (_, key: keyof typeof priceValues) => priceValues[key],
    ),
  );

  return (
    <section className="flex min-h-svh flex-col bg-concrete text-ink">
      <AgencyHeader withCta={false} />

      {/* Mobile: summary → form → details. Desktop: summary + details on the
          left, sticky form card on the right spanning both rows. */}
      <div className="grid gap-10 px-4 pb-16 pt-6 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-16 md:gap-y-8 md:px-16 md:pt-10">
        <div className="flex flex-col gap-8 md:col-start-1 md:row-start-1">
          <Link
            href={`${AGENCY_PATH}#cennik`}
            className="t-caption w-fit font-medium underline underline-offset-4 transition-colors hover:text-primary tracking-normal"
          >
            ← {t("back")}
          </Link>

          <div className="flex flex-col gap-4">
            <p className="t-caption font-medium uppercase tracking-loose text-gray-800">
              {t("eyebrow")}
            </p>
            <h1 className="t-title-xl tracking-loose">
              {t(`products.${productId}.name`)}
            </h1>
            <p className="t-lead-sm text-gray-800">
              {t(`products.${productId}.lead`)}
            </p>
          </div>

          <div className="flex flex-col gap-2 border-y border-gray-500 py-6">
            <p className="t-caption font-medium text-gray-800 tracking-normal">
              {t("priceLabel")}
            </p>
            <p className="t-title-lg">{priceValues.gross}</p>
            <p className="t-body text-gray-800 tracking-normal font-medium">
              {t("priceNet", { amount: priceValues.net })}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 self-start rounded-sm bg-graphite p-6 text-white md:col-start-2 md:row-span-2 md:row-start-1 md:sticky md:top-8 md:p-8">
          <h2 className="t-title-lg tracking-loose">{t("form.title")}</h2>
          {/* The client form only gets the keys it renders. */}
          <NextIntlClientProvider
            messages={{
              agency: {
                order: {
                  form: messages.agency.order.form,
                  errors: messages.agency.order.errors,
                },
              },
            }}
          >
            <OrderForm productId={productId} amountLabel={priceValues.gross} />
          </NextIntlClientProvider>
          <PaymentMethods tone="light" />
        </div>
        <div className="flex flex-col gap-8 md:col-start-1 md:row-start-2">
          <div className="flex flex-col gap-4">
            <h2 className="t-lead">{t("includesTitle")}</h2>
            <ul className="t-body flex list-disc flex-col gap-2 pl-6 text-gray-800 tracking-normal font-medium">
              {includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="t-lead">{t("termsTitle")}</h2>
            <ul className="t-body flex list-disc flex-col gap-2 pl-6 text-gray-800 tracking-normal font-medium">
              {terms.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="t-caption flex flex-col gap-1 text-gray-800 tracking-normal font-medium">
            <p className="font-semibold">{t("sellerTitle")}</p>
            <p>{COMPANY.name}</p>
            <p>{COMPANY_ADDRESS}</p>
            <p>
              NIP {COMPANY.nip}
              {COMPANY.regon ? `, REGON ${COMPANY.regon}` : ""}
            </p>
            <p>
              {COMPANY.email}
              {COMPANY.phone ? `, ${COMPANY.phone}` : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
