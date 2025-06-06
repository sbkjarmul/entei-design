import Text from "@/components/Text";
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import UserAvatarGroup from "./UserAvatarGroup";

export default function TrustedUs() {
  return (
    <div className="flex gap-2">
      <UserAvatarGroup />
      <div className="flex flex-col flex-1">
        <Image
          src="/images/icons/ratings.svg"
          alt="Client ratings"
          width={100}
          height={20}
          className="object-contain"
        />
        <Text className="text-xs">
          Zaufali nam founderzy, startupy i marki, które chcą się wyróżniać.
        </Text>
        <div className="mt-4"></div>
      </div>
    </div>
  );
}
