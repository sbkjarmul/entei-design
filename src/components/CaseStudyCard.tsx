import Image from "next/image";

interface CaseStudyCardProps {
  categories: string[];
  image: string;
  logo?: string;
  title: string;
  comingSoon?: boolean;
  size?: "big" | "small"; //
}

export default function CaseStudyCard({
  categories,
  image,
  logo,
  title,
  comingSoon,
  size = "small",
}: CaseStudyCardProps) {
  const titleSizeClass = size === "big" ? "text-[32px]" : "text-[24px]";
  const titleWidthClass = size === "big" ? "w-3/5" : "w-full";

  return (
    <div
      className={`relative w-full rounded-lg overflow-hidden group flex flex-col`}
    >
      <div className={`relative aspect-[1.34] overflow-hidden rounded-lg`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 "
        />

        <div className="absolute flex flex-wrap top-4 left-4 z-10 flex gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="bg-brand-gray-900 text-brand-gray-600 px-1 py-0.5 rounded-sm border border-brand-gray-600 text-xs"
            >
              {category}
            </span>
          ))}
        </div>

        {logo && (
          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <Image
              src={logo}
              alt="Case Study Logo"
              width={size === "big" ? 400 : 200}
              height={200}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        {comingSoon && (
          <span className="mb-2 text-brand-gray-600 text-sm">
            Case study wkrótce
          </span>
        )}
        <h3
          className={`text-brand-gray-400 font-regular leading-tight ${titleSizeClass} ${titleWidthClass}`}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
