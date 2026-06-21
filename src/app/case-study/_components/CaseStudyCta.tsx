import Link from "next/link";

/**
 * Closing CTA — large statement plus a „let's talk" link to the booking calendar.
 */
export default function CaseStudyCta({
  cta,
  talkUrl,
  talk,
}: {
  cta: string;
  talkUrl: string;
  talk: string;
}) {
  return (
    // Two-column grid (matching the body above): the statement + link sit in
    // the first column, the second column stays empty.
    <div className="grid gap-10 px-6 py-24 md:grid-cols-2 md:gap-12 md:px-12 md:py-32">
      <div className="flex flex-col gap-8">
        <p className="t-h1">{cta}</p>

        <Link
          href={talkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="t-h4 w-fit font-normal text-gray-900 underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70"
        >
          {talk}
        </Link>
      </div>
    </div>
  );
}
