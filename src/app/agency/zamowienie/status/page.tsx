import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { AGENCY_PATH } from "@/lib/agency";

import AgencyHeader from "../../components/AgencyHeader";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("agency.order.status.meta");
  return {
    title: { absolute: t("title") },
    robots: { index: false, follow: false },
  };
}

interface PageProps {
  searchParams: Promise<{ order?: string; error?: string }>;
}

/**
 * PayU `continueUrl`. Returning here does NOT prove payment (only the signed
 * notification does), so the copy promises an e-mail confirmation instead of
 * claiming success. PayU appends `error=…` when the payment failed.
 */
export default async function OrderStatusPage({ searchParams }: PageProps) {
  const { order, error } = await searchParams;
  const t = await getTranslations("agency.order.status");
  const variant = error ? "failure" : "success";
  const orderNumber = order && /^[A-Z0-9-]{6,40}$/.test(order) ? order : null;

  return (
    <section className="flex min-h-svh flex-col bg-concrete text-ink">
      <AgencyHeader withCta={false} />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <p className="t-caption font-medium uppercase tracking-loose text-gray-800">
          {t(`${variant}.eyebrow`)}
        </p>
        <h1 className="t-title-xl max-w-[900px] tracking-loose">
          {t(`${variant}.title`)}
        </h1>
        <p className="t-lead-sm max-w-[560px] text-gray-800">
          {t(`${variant}.body`)}
        </p>

        {orderNumber && (
          <p className="t-body text-gray-800 tracking-normal font-medium">
            {t("orderLabel")}:{" "}
            <span className="font-semibold text-ink">{orderNumber}</span>
          </p>
        )}

        <Link
          href={`${AGENCY_PATH}#cennik`}
          className="t-caption font-medium underline underline-offset-4 transition-colors hover:text-primary tracking-normal"
        >
          {t("back")}
        </Link>
      </div>
    </section>
  );
}
