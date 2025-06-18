"use client";

import React from "react";
import { useActionState } from "react";
import { submitContactForm } from "@/actions/submit-contact-form";
import ContactForm from "./ContactForm";
import ContactFormSuccessMessage from "./ContactFormSuccessMessage";

export default function ContactBox() {
  const initialState = {
    success: false,
  };

  const [state, action, isLoading] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <div className="bg-black px-4 py-20 md:p-10 rounded-none md:rounded-md min-h-[600px]">
      {state.success ? (
        <ContactFormSuccessMessage />
      ) : (
        <ContactForm formAction={action} isLoading={isLoading} />
      )}
    </div>
  );
}
