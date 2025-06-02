import React from "react";

interface SubheadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: keyof HTMLElementTagNameMap;
  children: React.ReactNode;
  className?: string;
}

export default function Subheading({
  as = "h2",
  children,
  className = "",
  ...rest
}: SubheadingProps) {
  const Tag = as;
  const defaultClass = "font-semibold text-xl md:text-2xl text-gray-800";
  const mergedClass = `${defaultClass} ${className}`.trim();
  return React.createElement(
    Tag,
    { className: mergedClass, ...rest },
    children
  );
}
