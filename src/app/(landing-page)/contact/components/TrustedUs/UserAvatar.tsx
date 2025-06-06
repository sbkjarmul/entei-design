import Image from "next/image";

interface UserAvatarProps {
  src: string;
  alt: string;
}

export default function UserAvatar({ src, alt }: UserAvatarProps) {
  return (
    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-500">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
