interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  iconRight?: React.ReactNode;
  rounded?: boolean;
  height?: string;
  width?: string;
}

export default function Button({
  children,
  variant = "primary",
  iconRight,
  rounded = true,
  height,
  width,
  ...props
}: ButtonProps) {
  const base = `${rounded ? "rounded-md" : ""} ${
    variant === "text" ? "" : "px-8 py-2"
  } relative text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary cursor-pointer ${
    height === "100%" ? "h-full" : height ? `h-[${height}]` : ""
  } ${width ? `w-[${width}]` : ""}`;
  const primary = "bg-primary text-black hover:bg-primary/90";
  const secondary =
    "bg-transparent border border-gray-500 text-gray-500 hover:text-gray-300";
  const text =
    "bg-transparent text-base text-gray-500 hover:border-secondary hover:text-white ";

  const variantClass =
    variant === "secondary" ? secondary : variant === "text" ? text : primary;

  return (
    <button className={`${base} ${variantClass} group`} {...props}>
      <div className="flex items-center justify-center gap-2 w-full">
        {children}
        {iconRight}
      </div>
    </button>
  );
}
