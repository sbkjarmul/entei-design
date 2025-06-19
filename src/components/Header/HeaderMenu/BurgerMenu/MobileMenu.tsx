"use client";

import Link from "next/link";

import { headerMenu } from "../constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      className={`absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg py-2 z-40 transition-all duration-300 ease-in-out transform origin-top-right ${
        isOpen
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      }`}
    >
      <nav className="flex flex-col">
        {headerMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 text-sm text-gray-300 hover:text-primary transition-colors cursor-pointer"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
