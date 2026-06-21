import React from "react";
import { cx } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export default function Heading({
  level,
  children,
  className,
  ...rest
}: HeadingProps) {
  const Tag = ("h" + level) as keyof HTMLElementTagNameMap;

  // Typography comes from the .t-* design tokens (src/styles/theme.css);
  // only layout utilities (max-w) stay here.
  let defaultClass = "";
  switch (level) {
    case 1:
      defaultClass = "t-h1 max-w-4xl";
      break;
    case 2:
      defaultClass = "t-h2 max-w-3xl";
      break;
    case 3:
      defaultClass = "t-h3 max-w-2xl";
      break;
    case 4:
      defaultClass = "t-h4";
      break;
    case 5:
      defaultClass = "t-h5";
      break;
    case 6:
      defaultClass = "t-h6";
      break;
    default:
      defaultClass = "";
  }

  return React.createElement(
    Tag,
    { className: cx(defaultClass, className), ...rest },
    children
  );
}
