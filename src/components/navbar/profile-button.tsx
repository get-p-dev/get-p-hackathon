import ProfileList from "./profile-list";

export type ProfileListProps = {
  name: string;
  href: string;
};

const profile_dummy = [
  { name: "마이페이지", href: "/mypage" },
  { name: "설정", href: "/settings" },
  { name: "로그아웃", href: "/auth/logout" },
];

export default function ProfileButton() {
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
        <div className="w-10 rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placeimg.com/80/80/people" alt="profile" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu menu-compact mt-3 w-52 rounded-lg border-2 bg-base-100 p-2 shadow-lg"
      >
        <ProfileList profileList={profile_dummy} />
      </ul>
    </div>
  );
}
