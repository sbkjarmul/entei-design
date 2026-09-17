import { CALENDLY_URL } from "@/lib/caseStudies";
import { cx } from "@/lib/utils";

import SignalDot from "./SignalDot";

/** "Mamy dostępne miejsca w Calendly" caption under a CTA, linking to Calendly. */
export default function AvailabilityLink({
  label,
  tone = "light",
}: {
  label: string;
  /** `light` on dark cards, `dark` on the concrete surface. */
  tone?: "light" | "dark";
}) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "t-caption flex items-center gap-2.5 font-medium tracking-normal underline-offset-4 hover:underline",
        tone === "light" ? "text-white" : "text-graphite",
      )}
    >
      <SignalDot />
      {label}
    </a>
  );
}
