"use client";

import Image from "next/image";

import ContactForm from "@/components/ContactForm";
import ContactInfo from "./components/ContactInfo";

export default function Contact() {
  return (
    <div className="inset-0 flex w-screen min-h-fit items-center justify-center p-12">
      <div className="flex flex-col lg:flex-row gap-12 p-2 rounded-lg w-full max-w-[1200px] max-h-[900px] min-h-fit">
        <div className="w-full lg:w-1/2 flex z-1 justify-center">
          <ContactInfo />
        </div>

        <div className="p-0 md:p-12 w-full lg:w-1/2 h-full flex flex-col z-1">
          <ContactForm onSubmit={() => {}} />
        </div>

        <div className="absolute inset-0 bottom-[-50%] translate-y-[25%] lg:translate-y-[10%] lg:inset-[-15%] flex items-center justify-end z-0 overflow-hidden select-none ">
          <Image
            src="/images/entei-logo-blurred.png"
            alt="Entei Design Background"
            fill
            className="object-cover lg:object-contain  lg:translate-x-[15%] pointer-event-none"
            priority
          />
        </div>
      </div>
    </div>
  );
}
