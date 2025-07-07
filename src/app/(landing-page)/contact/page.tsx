import Image from "next/image";

import ContactBox from "@/components/ContactBox";
import ContactInfo from "./components/ContactInfo";

export default function Contact() {
  return (
    <div className="inset-0 flex w-screen min-h-fit items-center justify-center p-0 md:p-8 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 rounded-lg w-full max-w-[1200px] max-h-[900px] min-h-fit">
        <div className="w-full lg:w-1/2 hidden sm:flex z-1 justify-center p-4 pt-16">
          <ContactInfo />
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col z-1">
          <ContactBox />
        </div>

        <div
          id="details"
          className="absolute inset-0 bottom-[-50%] translate-y-[25%] lg:translate-y-[5%] lg:inset-[-15%] flex items-center justify-end z-0 overflow-hidden select-none"
        >
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
