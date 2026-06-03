import Link from "next/link";

/**
 * Visible name / location / contact block for local landing pages.
 * Shows the city only (no street address). Keep in sync with LocalBusinessSchema.
 */
export default function LocalNap() {
  return (
    <address className="not-italic flex flex-col gap-1 text-gray-400 text-base">
      <span className="text-gray-200 font-medium">ENTEI Studio Graficzne</span>
      <span>Stalowa Wola</span>
      <Link href="mailto:hello@entei.design" className="text-primary hover:underline">
        hello@entei.design
      </Link>
    </address>
  );
}
