import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Sidebar from "../home/sidebar";
import NotificationButton from "../navbar/notification-button";
import ProfileButton from "../navbar/profile-button";
import Logo from "./logo";

export function BodyLayout({ children }: { children: ReactNode }) {
  const [token, setToken] = useState("");
  const [cookie] = useCookies(["token"]);

  useEffect(() => {
    // console.log(cookie.token);
    setToken(cookie.token);
  }, [cookie.token]);

  return (
    <>
      <div className="drawer-mobile drawer relative">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content relative">
          <div className="navbar sticky top-0 isolate z-50 border-b-2 bg-base-100">
            <div className="flex-none lg:hidden">
              <label htmlFor="sidebar" className="btn btn-square btn-ghost">
                <Bars3Icon className="h-6 w-6" />
              </label>
            </div>
            <div className="flex-1">
              <Logo />
            </div>

            {token ? (
              <>
                <NotificationButton />
                <ProfileButton />
              </>
            ) : (
              <>
                <Link href="/auth/signup">
                  <a>
                    <span className="btn mr-2 px-2 font-semibold">
                      회원가입
                    </span>
                  </a>
                </Link>
                <Link href="/auth/signin">
                  <a>
                    <span className="btn btn-ghost px-2 font-semibold">
                      로그인
                    </span>
                  </a>
                </Link>
              </>
            )}
          </div>
          <main className="mx-auto w-full">{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="sidebar" className="drawer-overlay"></label>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
