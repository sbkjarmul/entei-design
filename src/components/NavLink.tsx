"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export default function NavLink({
  href,
  ...props
}: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const isActive = pathname.includes(href.toString());

  return (
    <Link
      href={href}
      className={`${isActive ? "text-primary" : "text-gray-300"}  hover:text-primary transition-colors px-4 py-2`}
      {...props}
    />
  );
}
