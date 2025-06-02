import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof HTMLElementTagNameMap;
  children: React.ReactNode;
  className?: string;
}

export default function Text({
  as = "p",
  children,
  className = "",
  ...rest
}: TextProps) {
  const Tag = as;
  const defaultClass = "text-base md:text-lg max-w-2xl text-gray-500";
  const mergedClass = `${defaultClass} ${className}`.trim();
  return React.createElement(
    Tag,
    { className: mergedClass, ...rest },
    children
  );
}
