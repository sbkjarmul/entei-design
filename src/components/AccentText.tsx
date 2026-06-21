import React from "react";

interface AccentTextProps {
  children: React.ReactNode;
}

export default function AccentText({ children }: AccentTextProps) {
  return (
    <span className="t-accent text-black bg-primary px-2 w-fit">{children}</span>
  );
}
