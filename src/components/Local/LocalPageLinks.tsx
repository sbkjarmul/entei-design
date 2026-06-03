import Link from "next/link";

interface LocalLink {
  href: string;
  label: string;
}

const ALL_LINKS: LocalLink[] = [
  { href: "/studio-graficzne-stalowa-wola", label: "Studio graficzne Stalowa Wola" },
  { href: "/logo-stalowa-wola", label: "Projektowanie logo Stalowa Wola" },
  { href: "/strony-internetowe-stalowa-wola", label: "Strony internetowe Stalowa Wola" },
];

/**
 * Cross-links between the local landing pages (internal siloing).
 * Pass the current page's href via `current` to exclude it from the list.
 */
export default function LocalPageLinks({ current }: { current: string }) {
  const links = ALL_LINKS.filter((link) => link.href !== current);

  return (
    <nav className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="border border-gray-700 rounded-xl px-5 py-3 text-gray-300 hover:border-primary hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
