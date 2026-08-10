"use client";

import React from "react";
import Link from "next/link";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox, Field, Label, Textarea } from "@headlessui/react";

import Heading from "@/components/Heading";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { ContactFormData, contactFormSchema, defaultValues } from "./schema";

// Cloudflare Turnstile wstrzykuje ukryte pole "cf-turnstile-response" do formularza.
declare global {
  interface Window {
    turnstile?: {
      reset: (widgetId?: string) => void;
    };
  }
}

// Publiczny klucz widgetu. Gdy brak (np. lokalnie bez env) — Turnstile jest
// pomijany, a formularz i tak chroni honeypot + timing + walidacja serwera.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface ContactFormProps {
  formAction: (payload: FormData) => void;
  isLoading: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formAction,
  isLoading,
}: ContactFormProps) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    watch,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const policyAccepted = watch("acceptPolicy");

  // Znacznik czasu załadowania formularza — backend odrzuca submity szybsze
  // niż człowiek jest w stanie wypełnić (timing trap). Ustawiany po montażu,
  // żeby uniknąć niezgodności hydracji.
  const [loadedAt, setLoadedAt] = React.useState<number | null>(null);

  React.useEffect(() => {
    setLoadedAt(Date.now());
  }, []);

  // Token Turnstile jest jednorazowy. Po nieudanym submicie (formularz nadal
  // zamontowany — przy sukcesie ContactBox go odmontowuje) odświeżamy widget,
  // żeby ponowna wysyłka miała świeży token.
  const wasLoading = React.useRef(false);

  React.useEffect(() => {
    if (wasLoading.current && !isLoading) {
      window.turnstile?.reset();
    }
    wasLoading.current = isLoading;
  }, [isLoading]);

  return (
    <form action={formAction}>
      {/* Ochrona antybotowa — niewidoczna dla ludzi. Boty wypełniają każde
          pole (w tym ukryte), więc niepuste "website" = bot. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Nie wypełniaj tego pola
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>
      <input type="hidden" name="_loadedAt" value={loadedAt ?? ""} />

      <div className="flex flex-col gap-8 md:gap-4">
        <Heading level={3}>
          <span className="text-4xl text-gray-500 tracking-[-1px]">
            W czym{" "}
          </span>
          <span className="text-4xl text-gray-200 tracking-[-1px]">
            możemy Ci pomóc?
          </span>
        </Heading>

        <TextField
          {...register("fullName")}
          type="text"
          label="Imię i nazwisko"
          placeholder="Jak się nazywasz"
          isDisabled={isLoading}
          error={errors.fullName?.message}
        />

        <TextField
          {...register("email")}
          type="email"
          label="Adres email"
          placeholder="Gdzie możemy odpisać"
          isDisabled={isLoading}
          error={errors.email?.message}
        />

        <TextField
          {...register("companyName")}
          type="text"
          label="Nazwa firmy (opcjonalnie)"
          placeholder="Twoja marka, projekt lub startup"
          isDisabled={isLoading}
          error={errors.companyName?.message}
        />

        <Field className="flex flex-col gap-2">
          <Label>Opisz swój pomysł lub potrzeby</Label>
          <Textarea
            {...register("message")}
            placeholder="Podziel się ważnymi informacjami o Twojej marce lub projekcie"
            className="p-2 bg-black rounded-md text-gray-400 border border-gray-800 h-[160px]
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            disabled={isLoading}
            aria-disabled={isLoading}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </Field>

        <Field className="flex align-center justify-center gap-2">
          <Checkbox
            name="acceptPolicy"
            value="accepted"
            checked={policyAccepted}
            onChange={(checked) => setValue("acceptPolicy", checked)}
            className="cursor-pointer group block rounded border border-gray-500 bg-gray-800 data-checked:bg-primary h-[24px] w-[24px]
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary
          "
          >
            <svg
              className="stroke-gray-800 opacity-0 group-data-checked:opacity-100"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Checkbox>
          <Label className="text-xs text-gray-500 flex-1 cursor-pointer">
            Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
            kontaktu, zgodnie z{" "}
            <Link
              href="/polityka-prywatnosci"
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="underline hover:text-primary"
            >
              polityką prywatności
            </Link>
            .
          </Label>
          {errors.acceptPolicy && (
            <span className="text-red-500 text-sm">
              {errors.acceptPolicy.message}
            </span>
          )}
        </Field>

        {TURNSTILE_SITE_KEY && (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="afterInteractive"
            />
            <div
              className="cf-turnstile"
              data-sitekey={TURNSTILE_SITE_KEY}
              data-action="contact"
              data-theme="dark"
            />
          </>
        )}

        <Button
          variant="primary"
          type="submit"
          disabled={isLoading || !isValid || !isDirty}
        >
          {isLoading ? "Ładowanie" : "Wyślij zapytanie"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
