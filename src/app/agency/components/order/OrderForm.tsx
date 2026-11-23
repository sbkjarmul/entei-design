"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";

import { createPayuOrderAction } from "@/actions/create-payu-order";
import Button from "@/components/Button";
import { orderSchema, type OrderFormValues } from "@/lib/payu/order-schema";
import type { ProductId } from "@/lib/payu/products";
import { cx } from "@/lib/utils";

interface OrderFormProps {
  productId: ProductId;
  /** Formatted gross amount shown on the submit button. */
  amountLabel: string;
}

type TextFieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "companyName"
  | "nip"
  | "street"
  | "postalCode"
  | "city";

const LEGAL_LINK =
  "underline underline-offset-2 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Order form on the dark card of the order page. Validates on the client for
 * UX, then the server action re-validates, prices the order and returns the
 * PayU checkout URL, where we redirect the buyer.
 */
export default function OrderForm({ productId, amountLabel }: OrderFormProps) {
  const t = useTranslations("agency.order");
  const [serverError, setServerError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  // Timing trap: set after mount to avoid a hydration mismatch.
  const [loadedAt, setLoadedAt] = useState(0);
  const [website, setWebsite] = useState("");

  useEffect(() => setLoadedAt(Date.now()), []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    mode: "onTouched",
    defaultValues: {
      productId,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      wantsInvoice: false,
      companyName: "",
      nip: "",
      street: "",
      postalCode: "",
      city: "",
      acceptTerms: false,
      acceptStart: false,
    },
  });

  const wantsInvoice = watch("wantsInvoice");
  const busy = isSubmitting || redirecting;

  const onSubmit = async (values: OrderFormValues) => {
    setServerError(null);
    const result = await createPayuOrderAction(values, { website, loadedAt });
    if (result.ok) {
      setRedirecting(true);
      window.location.assign(result.redirectUri);
      return;
    }
    setServerError(t(`errors.${result.error}`));
  };

  const errorText = (error?: FieldError) =>
    error?.message ? t(`errors.${error.message}` as "errors.required") : null;

  const field = (
    name: TextFieldName,
    options: {
      type?: string;
      autoComplete?: string;
      inputMode?: "numeric" | "tel" | "email";
    } = {},
  ) => {
    const error = errorText(errors[name]);
    const id = `order-${name}`;
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="t-caption font-medium text-gray-300 tracking-normal"
        >
          {t(`form.${name}`)}
        </label>
        <input
          id={id}
          type={options.type ?? "text"}
          autoComplete={options.autoComplete}
          inputMode={options.inputMode}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          disabled={busy}
          className={cx(
            "t-body rounded-sm border bg-transparent px-4 py-4 text-white transition-colors tracking-normal font-medium",
            "focus-visible:border-white focus-visible:outline-none",
            error ? "border-primary" : "border-gray-700 hover:border-gray-500",
          )}
          {...register(name)}
        />
        {error && (
          <span
            id={`${id}-error`}
            className="t-caption text-primary tracking-normal font-medium"
          >
            {error}
          </span>
        )}
      </div>
    );
  };

  const checkbox = (
    name: "wantsInvoice" | "acceptTerms" | "acceptStart",
    label: ReactNode,
  ) => {
    const error = errorText(errors[name]);
    const id = `order-${name}`;
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="flex cursor-pointer items-start gap-4">
          <input
            id={id}
            type="checkbox"
            disabled={busy}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className="mt-1 size-4 shrink-0 cursor-pointer accent-primary"
            {...register(name)}
          />
          <span className="t-caption text-gray-300 tracking-normal font-medium">
            {label}
          </span>
        </label>
        {error && (
          <span
            id={`${id}-error`}
            className="t-caption pl-8 text-primary tracking-normal font-medium"
          >
            {error}
          </span>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6"
    >
      {/* Honeypot: invisible to people, bots fill every field. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <input type="hidden" {...register("productId")} />

      <div className="grid gap-4 md:grid-cols-2">
        {field("firstName", { autoComplete: "given-name" })}
        {field("lastName", { autoComplete: "family-name" })}
        {field("email", {
          type: "email",
          autoComplete: "email",
          inputMode: "email",
        })}
        {field("phone", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
      </div>

      {checkbox("wantsInvoice", t("form.wantsInvoice"))}

      {wantsInvoice && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            {field("companyName", { autoComplete: "organization" })}
          </div>
          {field("nip", { inputMode: "numeric" })}
          {field("street", { autoComplete: "address-line1" })}
          {field("postalCode", {
            autoComplete: "postal-code",
            inputMode: "numeric",
          })}
          {field("city", { autoComplete: "address-level2" })}
        </div>
      )}

      <hr className="border-gray-800" />

      {checkbox(
        "acceptTerms",
        t.rich("form.acceptTerms", {
          terms: (chunks) => (
            <a
              href="/regulamin"
              target="_blank"
              rel="noopener"
              className={LEGAL_LINK}
            >
              {chunks}
            </a>
          ),
          purchase: (chunks) => (
            <a
              href="/zasady-zakupow"
              target="_blank"
              rel="noopener"
              className={LEGAL_LINK}
            >
              {chunks}
            </a>
          ),
          privacy: (chunks) => (
            <a
              href="/polityka-prywatnosci"
              target="_blank"
              rel="noopener"
              className={LEGAL_LINK}
            >
              {chunks}
            </a>
          ),
        }),
      )}
      {checkbox("acceptStart", t("form.acceptStart"))}

      <p className="t-caption text-gray-500 tracking-normal font-medium">
        {t("form.requiredNote")}
      </p>

      {serverError && (
        <p
          role="alert"
          className="t-body rounded-sm border border-primary px-4 py-4 text-white tracking-normal font-medium"
        >
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          variant="primary"
          rounded={false}
          disabled={busy}
          className="w-full rounded-sm px-6 py-4 leading-5 tracking-loose"
        >
          {busy
            ? t("form.submitting")
            : t("form.submit", { amount: amountLabel })}
        </Button>
        <p className="t-caption text-center text-gray-500 tracking-normal font-medium">
          {t("form.paymentNote")}
        </p>
      </div>
    </form>
  );
}
