import { cx } from "@/lib/utils";

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
  className,
  ...props
}: ButtonProps) {
  const baseClasses = cx(
    "relative text-base font-medium transition-all duration-500 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
    rounded && "rounded-xl",
    variant !== "text" && "px-8 py-4",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    height === "100%" && "h-full",
    height && height !== "100%" && `h-[${height}]`,
    width && `w-[${width}]`,
    isHero && "w-full sm:w-fit"
  );

  const variantClasses = cx(
    variant === "primary" && [
      disabled
        ? "bg-gray-500 text-gray-300"
        : "bg-primary text-black hover:bg-primary/90 md:hover:scale-105",
    ],
    variant === "secondary" && [
      disabled
        ? "bg-black text-gray-500"
        : "bg-black text-gray-500 hover:text-gray-300",
    ],
    variant === "text" && [
      disabled
        ? "bg-transparent text-base text-gray-500"
        : "bg-transparent text-base text-gray-500 hover:border-secondary hover:text-white",
    ]
  );

  return (
    <button
      className={cx(baseClasses, variantClasses, "group", className)}
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
