"use client";

import React from "react";
import Image from "next/image";

interface LogoBannerProps {
  logos: string[];
}

export default function LogoBanner({ logos }: LogoBannerProps) {
  // Duplicate the logos for seamless looping
  const allLogos = [...logos, ...logos];

  return (
    <div className="w-full h-[100px] overflow-hidden relative bg-transparent flex items-center">
      <div className="flex flex-row items-center animate-logo-banner-move whitespace-nowrap min-w-fit gap-16 md:gap-24">
        {allLogos.map((logo, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center h-[80px] w-[100px] md:h-[80px] md:w-[160px]"
          >
            <Image
              src={logo}
              alt={`logo-${idx % logos.length}`}
              width={160}
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
