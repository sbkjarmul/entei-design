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
    <div className={`relative w-full overflow-hidden group flex flex-col`}>
      <div
        className={`relative aspect-[1.34] overflow-hidden rounded-none md:rounded-lg`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 "
        />

        <div className="absolute flex flex-wrap top-4 left-4 z-10 flex gap-4">
          {categories.map((category) => (
            <span
              key={category}
              className="bg-gray-900 text-gray-600 px-1 py-0.5 rounded-sm border border-gray-600 text-xs"
            >
              {category}
            </span>
          ))}
        </div>

        {logo && (
          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex items-center justify-center z-20">
            <Image
              src={logo}
              alt="Case Study Logo"
              width={size === "big" ? 400 : 200}
              height={200}
            />
          </div>
        )}
      </div>

      <div className="p-4 sm:px-0 sm:py-4">
        {comingSoon && (
          <span className="mb-2 text-gray-600 text-sm">Case study wkrótce</span>
        )}
        <h3
          className={`text-gray-400 font-regular leading-tight ${titleSizeClass} ${titleWidthClass}`}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
