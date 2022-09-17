import { router } from "@trpc/server";
import axios from "axios";
import { profile } from "console";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import ProfileList from "./profile-list";

export type ProfileListProps = {
  name: string;
  href: string;
};

const profile_dummy = [
  { name: "마이페이지", href: "/mypage" },
  { name: "설정", href: "/settings" },
];

// [GET] http://localhost:8080/user/image with cookie -> return image filename
export default function ProfileButton() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();

  const { data: filename } = useQuery(
    "filename",
    async () => {
      const res = await axios.get("http://localhost:8080/users/image", {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      return res.data.image;
    },
    {
      enabled: !!cookie.token,
    }
  );

  const { data: profileImage, isLoading } = useQuery(
    "profileImage",
    async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/images/${filename}`,
          {
            responseType: "blob",
          }
        );
        return URL.createObjectURL(
          new Blob([res.data], { type: res.headers["content-type"] })
        );
      } catch (err) {
        return "";
      }
    },
    {
      enabled: !!filename,
    }
  );

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
        <div className="w-10 rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isLoading || !profileImage ? "/profile.svg" : profileImage}
            alt="profile"
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu menu-compact mt-3 w-52 rounded-lg border-2 bg-base-100 p-2
             shadow-lg"
      >
        <ProfileList profileList={profile_dummy} />
        <li>
          <button
            className="text-base"
            onClick={() => {
              removeCookie("token", { path: "/" });
              router.push("/");
            }}
          >
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
}
