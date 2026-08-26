import UserAvatar from "./UserAvatar";

export default function UserAvatarGroup() {
  return (
    <div className="flex gap-[-100px]">
      <div className="-mr-3">
        <UserAvatar
          src="/images/user-avatars/michal-merkiel-avatar.webp"
          alt="Michał Merkiel, Suseu"
        />
      </div>
      <div className="-mr-3">
        <UserAvatar
          src="/images/user-avatars/pola-bladek-avatar.webp"
          alt="Pola Błądek, Lagom"
        />
      </div>
      <div className="-mr-3">
        <UserAvatar
          src="/images/user-avatars/krystian-jarmul-avatar.jpeg"
          alt="Krystian Jarmuł, Manda"
        />
      </div>

      <UserAvatar
        src="/images/user-avatars/mateusz-ozga-avatar.webp"
        alt="Mateusz Ozga, REM-MET"
      />
    </div>
  );
}
