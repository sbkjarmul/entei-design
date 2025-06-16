"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<typeof Link> {}

export default function NavLink({ href, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(href.toString());

  return (
    <Link
      href={href}
      className={`${isActive ? "text-primary" : "text-brand-gray-300"}  hover:text-primary transition-colors px-4 py-2`}
      {...props}
    />
  );
}
