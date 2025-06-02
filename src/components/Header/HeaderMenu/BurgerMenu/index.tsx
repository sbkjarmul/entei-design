"use client";

import { useState } from "react";
import BurgerButton from "./BurgerButton";
import MobileMenu from "./MobileMenu";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <BurgerButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
