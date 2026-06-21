import Link from "next/link";

/**
 * Closing CTA — large statement plus an optional link to the client's live site.
 */
export default function CaseStudyCta({
  cta,
  liveUrl,
  viewLive,
}: {
  cta: string;
  liveUrl?: string;
  viewLive: string;
}) {
  return (
    <div className="flex flex-col gap-8 px-6 py-24 md:px-12 md:py-32">
      <p className="t-h1">{cta}</p>

      {liveUrl && (
        <Link
          href={liveUrl}
          target="_blank"
          className="t-h4 w-fit font-normal text-gray-900 underline decoration-2 underline-offset-8 transition-opacity hover:opacity-70"
        >
          {viewLive}
        </Link>
      )}
    </div>
  );
}
