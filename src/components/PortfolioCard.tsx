import Image from "next/image";

interface PortfolioCardProps {
  /** Brand display name, e.g. "Suseu" */
  name: string;
  /** Card image (full-bleed inside the tile) */
  image: string;
  /** Country label shown on hover, e.g. "Polska" */
  country: string;
}

/**
 * Portfolio tile — image that reveals the project name (left) and country
 * (right) over the image on hover, mirroring the berrielbrands works grid.
 * Pure-CSS hover (no JS); copy uses Neue Haas only.
 */
export default function PortfolioCard({
  name,
  image,
  country,
}: PortfolioCardProps) {
  return (
    <div className="group relative aspect-[1.4] w-full overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Bottom gradient for legibility, fades in on hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Name (left) + country (right), revealed on hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-6">
        <span className="font-neue-haas text-sm font-medium uppercase tracking-wide text-white md:text-base">
          {name}
        </span>
        <span className="font-neue-haas text-sm font-medium uppercase tracking-wide text-white/70 md:text-base">
          ({country})
        </span>
      </div>
    </div>
  );
}
