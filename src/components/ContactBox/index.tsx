"use client";

import React, { useEffect } from "react";
import { useActionState } from "react";
import { submitContactForm } from "@/actions/submit-contact-form";

import ContactForm from "./ContactForm";
import ContactFormSuccessMessage from "./ContactFormSuccessMessage";
import { trackEvent } from "@/lib/pixel";

export default function ContactBox() {
  const initialState = {
    success: false,
    eventId: "",
  };

  const [state, action, isLoading] = useActionState(
    submitContactForm,
    initialState,
  );

  useEffect(() => {
    if (state.success && state.eventId) {
      trackEvent("Lead", state.eventId);
    }
  }, [state.success, state.eventId]);

  return (
    <div className="flex flex-col items-center justify-center bg-black px-4 py-20 md:p-10 rounded-none md:rounded-md min-h-[600px] h-full">
      {state.success ? (
        <ContactFormSuccessMessage />
      ) : (
        <ContactForm formAction={action} isLoading={isLoading} />
      )}
    </div>
  );
}
