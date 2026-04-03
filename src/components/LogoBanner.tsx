"use client";

import React from "react";
import Image from "next/image";

interface LogoBannerProps {
  logos: string[];
}

export default function LogoBanner({ logos }: LogoBannerProps) {
  const allLogos = [...logos, ...logos];

  return (
    <div className="w-full h-[75px] overflow-hidden relative bg-transparent flex items-center relative">
      <div className="absolute z-10 inset-0 bg-[radial-gradient(circle,_transparent_0%,_black_100%)]"></div>
      <div className="flex flex-row items-center animate-logo-banner-move whitespace-nowrap min-w-fit gap-16 md:gap-10">
        {allLogos.map((logo, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center h-[80px] w-[100px] md:h-[80px] md:w-[160px]"
          >
            <Image
              src={logo}
              alt={`logo-${idx % logos.length}`}
              width={120}
              height={40}
              className="object-contain opacity-50"
              priority
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes logo-banner-move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-logo-banner-move {
          animation: logo-banner-move 16s linear infinite;
        }
      `}</style>
    </div>
  );
}
