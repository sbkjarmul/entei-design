import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export default function Heading({
  level,
  children,
  className = "",
  ...rest
}: HeadingProps) {
  const Tag = ("h" + level) as keyof HTMLElementTagNameMap;

  let defaultClass = "";
  switch (level) {
    case 1:
      defaultClass = "font-medium text-4xl md:text-6xl max-w-4xl";
      break;
    case 2:
      defaultClass = "font-medium text-4xl md:text-5xl max-w-3xl";
      break;
    case 3:
      defaultClass = "text-xl md:text-2xl max-w-2xl";
      break;
    case 4:
      defaultClass = "text-lg md:text-xl";
      break;
    case 5:
      defaultClass = " text-base md:text-lg";
      break;
    case 6:
      defaultClass = "font-medium text-sm md:text-base";
      break;
    default:
      defaultClass = "";
  }

  const mergedClass = `${defaultClass} ${className}`.trim();

  return React.createElement(
    Tag,
    { className: mergedClass, ...rest },
    children
  );
}
