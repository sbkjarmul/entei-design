"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

import ScrambleText from "./ScrambleText";

export default function NavLink({
  href,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const isActive = pathname.includes(href.toString());

  return (
    <Link
      href={href}
      className={`${isActive ? "text-primary font-bold" : "text-gray-300"}  hover:text-primary transition-colors px-4 py-2`}
      {...props}
    >
      {typeof children === "string" ? (
        <ScrambleText>{children}</ScrambleText>
      ) : (
        children
      )}
    </Link>
  );
}
