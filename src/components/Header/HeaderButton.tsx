"use client";

import { useRouter } from "next/navigation";

export default function HeaderButton() {
  const router = useRouter();

  const handleButtonClick = () => router.push("/contact");

  return (
    <button
      className="h-full px-4 md:px-10 bg-primary text-black text-regular md:text-2xl font-normal hover:bg-primary/90 transition-colors cursor-pointer
      focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      onClick={handleButtonClick}
    >
      <div className="flex flex-col items-center leading-tight md:leading-7">
        <span>Porozmawiajmy o</span>
        <span>
          <span className="font-bold">Twoim</span> projekcie
        </span>
      </div>
    </button>
  );
}
