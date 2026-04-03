"use client";

import Image from "next/image";

export default function SuseuSection() {
  return (
    <div className="flex pt-20 border-b  border-gray-700 overflow-y-hidden h-[600px]">
      <div className="flex flex-col w-[40%] px-20 gap-10">
        <h1 className="text-4xl font-bold">Wyszukiwarka</h1>
        <p>
          Filtruj i przeszukuj różne platformy za pomocą inteligentnego modelu,
          aby znaleźć idealnego Twórce do swojej współpracy.
        </p>
      </div>

      <div className="relative flex flex-col w-[60%] h-full justify-end">
        <div className="border-t border-l border-solid border-gray-700 overflow-hidden rounded-tl-xl relative h-[100%] shadow-[0px_4px_200px_-100px_#FF99FA]">
          <Image
            src="/images/suseu/suseu-research.png"
            alt="Suseu Research View"
            fill
            className="object-cover object-left-top"
          />
        </div>

        <div className="absolute bottom-[-20%] left-[-20%] border border-solid border-gray-700 overflow-hidden rounded-4xl w-[375px] h-[350px] shadow-[0px_4px_200px_-100px_#FF99FA]">
          <Image
            src="/images/suseu/suseu-set-birthday.png"
            alt="Suseu Research View"
            fill
            className="object-cover object-left-top"
          />
        </div>
      </div>
    </div>
  );
}
