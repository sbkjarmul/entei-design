"use client";

import Image from "next/image";
import SocialMediaButton from "./SocialMediaButton";

export default function Footer() {
  return (
    <footer className="bg-primary text-black z-10">
      <div className=" mx-auto p-4 h-full">
        <div className="flex flex-col h-full gap-16">
          <div className="flex flex-col gap-0 text-center md:text-start text-sm leading-tight">
            <span>Tworzymy obrazy, które mówią głośniej niż słowa.</span>
            <span>
              Dołącz do <span className="font-bold">rewolucji!</span>
            </span>
          </div>
          <div className="flex-1 flex items-end pb-8 items-start gap-4 flex-wrap">
            <div className="w-[100%] h-[100px] md:w-[600px] md:h-[140px] relative">
              <Image
                src="/images/entei-black-wordmark.svg"
                alt="Entei Design"
                fill
                className="object-fill"
              />
            </div>
            <div className="flex flex-col ">
              <div className="flex-col hidden lg:flex leading-tight">
                <span>Design studio</span>
                <span>Revolutionize your brand</span>
                <span>Modern visual identities.</span>
              </div>
            </div>
            <div className="flex flex-1 justify-center md:justify-end items-end gap-4 h-[140px]">
              <SocialMediaButton
                href="https://instagram.com/entei.designs"
                icon="/images/emails/entei-email-icon.png"
                platform="Instagram"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
