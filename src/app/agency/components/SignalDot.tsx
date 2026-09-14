import { cx } from "@/lib/utils";

/** Red "live" dot with a soft blurred glow (Figma "Signal"). */
export default function SignalDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        "relative flex size-3 shrink-0 items-center justify-center rounded-full bg-primary",
        className,
      )}
    >
      <span className="size-4 shrink-0 rounded-full bg-primary blur-[5.5px]" />
    </span>
  );
}
