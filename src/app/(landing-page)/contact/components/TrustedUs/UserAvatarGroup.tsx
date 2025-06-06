import UserAvatar from "./UserAvatar";

export default function UserAvatarGroup() {
  return (
    <div className="flex gap-[-100px]">
      <div className="-mr-3">
        <UserAvatar
          src="/images/user-avatars/michal-merkiel-avatar.png"
          alt="Michał Merkiel, Suseu"
        />
      </div>
      <div className="-mr-3">
        <UserAvatar
          src="/images/user-avatars/pola-bladek-avatar.png"
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
        src="/images/user-avatars/mateusz-ozga-avatar.jpg"
        alt="Mateusz Ozga, REM-MET"
      />
    </div>
  );
}
