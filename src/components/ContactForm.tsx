import React from "react";
import Heading from "./Heading";
import { Checkbox, Field, Label, Textarea } from "@headlessui/react";
import TextField from "./TextField";
import Button from "./Button";

interface ContactFormProps {
  onSubmit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
}: ContactFormProps) => {
  return (
    <div className="flex flex-col gap-4 bg-black p-10 rounded-md">
      <Heading level={3}>
        <span className="text-[32px] text-gray-500 tracking-[-2px]">
          W czym{" "}
        </span>
        <span className="text-[32px] text-gray-200 tracking-[-2px]">
          możemy Ci pomóc?
        </span>
      </Heading>
      <Field className="flex flex-col gap-2">
        <Label htmlFor="full_name" className="text-gray-200">
          Imię i nazwisko
        </Label>
        <TextField
          name="full_name"
          type="text"
          placeholder="Jak się nazywasz"
        />
      </Field>
      <Field className="flex flex-col gap-2">
        <Label>Adres email</Label>
        <TextField
          name="email"
          type="email"
          placeholder="Gdzie możemy odpisać"
        />
      </Field>
      <Field className="flex flex-col gap-2">
        <Label>Nazwa firmy (opcjonalnie)</Label>
        <TextField
          name="company_name"
          type="text"
          placeholder="Twoja marka, projekt lub startup"
        />
      </Field>

      <Field className="flex flex-col gap-2">
        <Label>Opisz swój pomysł lub potrzeby</Label>
        <Textarea
          name="message"
          placeholder="Podziel się ważnymi informacjami o Twojej marce lub projekcie"
          className="p-2 bg-black rounded-md text-gray-500 border border-gray-800 h-[160px]
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        />
      </Field>

      <Field className="flex align-center gap-2 ">
        <Checkbox
          name="accept_policy"
          className="cursor-pointer group block rounded border border-gray-500 bg-gray-800 data-checked:bg-primary h-[24px] w-[24px]"
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
          Wyrażam zgodę na przetwarzanie moich danych osobowych w celu kontaktu,
          zgodnie z polityką prywatności.
        </Label>
      </Field>

      <Button variant="primary" onClick={onSubmit}>
        Wyślij zapytanie
      </Button>
    </div>
  );
};

export default ContactForm;
