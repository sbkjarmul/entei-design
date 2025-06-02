interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  iconRight?: React.ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  iconRight,
  ...props
}: ButtonProps) {
  const base =
    "rounded-md px-8 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary cursor-pointer";
  const primary = "bg-primary text-black hover:bg-primary/90";
  const secondary =
    "bg-transparent border border-gray-500 text-gray-500 hover:text-gray-300";
  const text =
    "bg-transparent text-base text-gray-500 hover:border-secondary hover:text-white ";

  const variantClass =
    variant === "secondary" ? secondary : variant === "text" ? text : primary;

  return (
    <button className={`${base} ${variantClass}`} {...props}>
      <div className="flex items-center gap-2">
        {children}
        {iconRight}
      </div>
    </button>
  );
}
