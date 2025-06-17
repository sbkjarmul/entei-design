import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({
  children,
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`flex flex-col py-20 px-4 mx-auto w-full gap-6 px-8 ${className}`}
    >
      {children}
    </section>
  );
}
