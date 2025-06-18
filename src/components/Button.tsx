interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  iconRight?: React.ReactNode;
  rounded?: boolean;
  height?: string;
  width?: string;
  isHero?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  iconRight,
  rounded = true,
  height,
  width,
  disabled,
  isHero,
  ...props
}: ButtonProps) {
  const base = `${rounded ? "rounded-md" : ""} ${
    variant === "text" ? "" : "px-8 py-4"
  } relative text-base font-medium transition-all duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
    disabled ? "cursor-not-allowed" : "cursor-pointer"
  } ${
    height === "100%" ? "h-full" : height ? `h-[${height}]` : ""
  } ${width ? `w-[${width}]` : ""}
    ${isHero ? "w-full sm:w-fit" : ""}
  `;

  const primary = `${disabled ? "bg-gray-500 text-gray-300" : "bg-primary text-black hover:bg-primary/90 md:hover:scale-105"}`;
  const secondary = `${
    disabled
      ? "bg-black text-gray-500 "
      : "bg-black text-gray-500 hover:text-gray-300"
  }`;
  const text = `${
    disabled
      ? "bg-transparent text-base text-gray-500"
      : "bg-transparent text-base text-gray-500 hover:border-secondary hover:text-white"
  }`;

  const variantClass =
    variant === "secondary" ? secondary : variant === "text" ? text : primary;

  return (
    <button
      className={`${base} ${variantClass} group`}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2 w-full">
        {children}
        {iconRight}
      </div>
    </button>
  );
}
