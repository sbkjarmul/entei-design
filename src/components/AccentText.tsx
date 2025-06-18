import React from "react";

interface AccentTextProps {
  children: React.ReactNode;
}

export default function AccentText({ children }: AccentTextProps) {
  return (
    <span className="text-black bg-primary px-2 text-sm w-fit">{children}</span>
  );
}
