import { ProfileListProps } from "./profile-button";

export default function ProfileList({
  profileList,
}: {
  profileList: ProfileListProps[];
}) {
  return (
    <>
      {profileList.map((profile) => (
        <li key={profile.name}>
          <a className="text-base" href={profile.href}>
            {profile.name}
          </a>
        </li>
      ))}
    </>
  );
}
