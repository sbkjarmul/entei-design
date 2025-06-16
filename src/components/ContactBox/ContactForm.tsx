"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox, Field, Label, Textarea } from "@headlessui/react";

import Heading from "@/components/Heading";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { ContactFormData, contactFormSchema, defaultValues } from "./schema";

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

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <Heading level={3}>
          <span className="text-[32px] text-gray-500 tracking-[-1px]">
            W czym{" "}
          </span>
          <span className="text-[32px] text-gray-200 tracking-[-1px]">
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
            kontaktu, zgodnie z polityką prywatności.
          </Label>
          {errors.acceptPolicy && (
            <span className="text-red-500 text-sm">
              {errors.acceptPolicy.message}
            </span>
          )}
        </Field>

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
