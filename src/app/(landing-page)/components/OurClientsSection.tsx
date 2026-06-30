"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { cx } from "@/lib/utils";

interface Client {
  logo: string;
  name: string;
  url: string;
}

const CLIENTS: Client[] = [
  {
    logo: "/images/our-clients/art-mat-logo.png",
    name: "art-mat",
    url: "https://art-mat.com.pl",
  },
  {
    logo: "/images/our-clients/rem-met-logo.png",
    name: "rem-met",
    url: "https://www.rem-met.com",
  },
  {
    logo: "/images/our-clients/aristo-logo.png",
    name: "aristo",
    url: "https://aristo-pharma.pl",
  },
  {
    logo: "/images/our-clients/highwave-logo.png",
    name: "highwave",
    url: "https://highwavewear.pl/",
  },
  {
    logo: "/images/our-clients/hatan-logo.png",
    name: "hatan",
    url: "https://instagram.com/hatan_pl",
  },
  {
    logo: "/images/our-clients/suseu-logo.png",
    name: "suseu",
    url: "https://suseu.app/",
  },
  {
    logo: "/images/our-clients/ecomgo-logo.png",
    name: "ecomgo",
    url: "https://ecomgo.pl/",
  },
  {
    logo: "/images/case-studies/italiana-case-study-logo.svg",
    name: "italiana",
    url: "https://www.pizzeriaitaliana.com.pl/",
  },
  {
    logo: "/images/our-clients/broscars-logo.png",
    name: "broscars",
    url: "https://broscars.pl/",
  },
  {
    logo: "/images/our-clients/brandsets-logo.png",
    name: "brandsets",
    url: "https://brandsets.pl/",
  },
];

export default function OurClientsSection() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setActive((prev) => {
        // pick a random logo different from the one currently lit
        let next = prev;
        while (next === prev) {
          next = Math.floor(Math.random() * CLIENTS.length);
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      className="min-h-[800px] justify-center px-8 relative overflow-hidden bg-gray-900"
      id="ourclients"
    >
      <h2 className="t-h3 max-w-xl">
        Zaufali nam ambitni założyciele,
        <br />
        oraz dynamicznie rozwijające się firmy w Polsce.
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full">
        {CLIENTS.map((client, i) => (
          <Link
            key={client.name}
            href={client.url}
            target="_blank"
            className="group flex items-center justify-center p-8 min-h-[140px]"
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={150}
              height={100}
              sizes="(max-width: 768px) 160px, 160px"
              className={cx(
                "max-w-[140px] w-full h-auto object-contain grayscale brightness-0 invert transition-opacity duration-500 group-hover:opacity-90",
                active === i ? "opacity-90" : "opacity-40",
              )}
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}
