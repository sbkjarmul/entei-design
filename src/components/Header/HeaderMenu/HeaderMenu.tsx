import NavLink from "@/components/NavLink";

import { headerMenu } from "./constants";

export default function HeaderMenu() {
  return (
    <nav className="hidden md:flex items-center bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {headerMenu.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
