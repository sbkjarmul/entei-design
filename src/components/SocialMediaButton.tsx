import Image from "next/image";
import Button from "./Button";

interface SocialMediaButtonProps {
  href: string;
  icon: string;
  platform: string;
  className?: string;
}

export default function SocialMediaButton({
  href,
  icon,
  platform,
}: SocialMediaButtonProps) {
  return (
    <Button variant="secondary" onClick={() => window.open(href, "_blank")}>
      <div className="flex items-center gap-2 min-w-[110px]">
        <Image
          src={icon}
          alt={platform}
          width={24}
          height={24}
          className="object-contain"
        />
        <div className="flex flex-col items-start">
          <span className="text-[8px] text-gray-400 leading-[10px] tracking-[0.5px]">
            FOLLOW US ON
          </span>
          <span className="text-base leading-[18px] font-semibold text-gray-200">
            {platform}
          </span>
        </div>
      </div>
    </Button>
  );
}
