import Button from "@/components/Button";
import ScrambleText from "@/components/ScrambleText";
import { CAL_COM_URL } from "@/lib/agency";
import { cx } from "@/lib/utils";

import SignalDot from "./SignalDot";

interface BookingButtonProps {
  label: string;
  /** Shorter label shown below `md` (e.g. in the mobile header). */
  shortLabel?: string;
  variant?: "primary" | "dark";
  /** Show the red dot before the label. */
  withSignal?: boolean;
  className?: string;
}

/** CTA linking straight to the Cal.com booking page (new tab). */
export default function BookingButton({
  label,
  shortLabel,
  variant = "dark",
  withSignal = false,
  className,
}: BookingButtonProps) {
  const recolor = variant !== "primary";

  return (
    <Button
      href={CAL_COM_URL}
      target="_blank"
      variant={variant}
      rounded={false}
      className={cx(
        "inline-flex rounded-sm px-6 py-4 font-medium leading-5 tracking-loose whitespace-nowrap",
        className,
      )}
    >
      <span className="flex items-center gap-4">
        {withSignal && <SignalDot />}
        {shortLabel ? (
          <>
            <ScrambleText recolor={recolor} className="md:hidden">
              {shortLabel}
            </ScrambleText>
            <ScrambleText recolor={recolor} className="hidden md:inline">
              {label}
            </ScrambleText>
          </>
        ) : (
          <ScrambleText recolor={recolor}>{label}</ScrambleText>
        )}
      </span>
    </Button>
  );
}
