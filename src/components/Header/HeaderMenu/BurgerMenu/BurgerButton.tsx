"use client";

interface BurgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function BurgerButton({ isOpen, onToggle }: BurgerButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1 cursor-pointer"
    >
      <span
        className={`w-6 h-[2px] transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-1 bg-primary" : "bg-white"
        }`}
      />
      <span
        className={`w-6 h-[2px] transition-all duration-300 ${
          isOpen ? "opacity-0 bg-primary" : "bg-white"
        }`}
      />
      <span
        className={`w-6 h-[2px] transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-1 bg-primary" : "bg-white"
        }`}
      />
    </button>
  );
}
