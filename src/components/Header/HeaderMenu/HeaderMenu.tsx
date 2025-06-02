import Link from "next/link";

import { headerMenu } from "./constants";

export default function HeaderMenu() {
  return (
    <nav className="hidden md:flex items-center bg-brand-gray-900 border border-brand-gray-800 rounded-lg px-4 py-2">
      {headerMenu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-brand-gray-300 hover:text-primary transition-colors px-4 py-2"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
