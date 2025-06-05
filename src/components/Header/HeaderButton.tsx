"use client";

import { useState } from "react";
import ContactDialog from "../ContactDialog";

export default function HeaderButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        className="h-full px-16 bg-primary text-black text-2xl font-normal hover:bg-primary/90 transition-colors cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex flex-col items-center leading-7">
          <span>Porozmawiajmy o</span>
          <span>
            <span className="font-bold">Twoim</span> projekcie
          </span>
        </div>
      </button>

      <ContactDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </>
  );
}
