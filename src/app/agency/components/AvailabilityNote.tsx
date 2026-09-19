import { cx } from "@/lib/utils";

import SignalDot from "./SignalDot";

/** "Mamy dostępne miejsca w Calendly" caption under the Calendly button. */
export default function AvailabilityNote({
  label,
  tone = "light",
}: {
  label: string;
  /** `light` on dark cards, `dark` on the concrete surface. */
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cx(
        "t-caption flex items-center gap-2.5 font-medium tracking-normal",
        tone === "light" ? "text-white" : "text-graphite",
      )}
    >
      <SignalDot />
      {label}
    </p>
  );
}
