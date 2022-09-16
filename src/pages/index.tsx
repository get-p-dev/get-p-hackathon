import type { NextPage } from "next";
import NotificationButton from "../components/navbar/notification-button";
import ProfileButton from "../components/navbar/profile-button";
import { Bars3Icon } from "@heroicons/react/20/solid/";
import AdBanner from "../components/home/adbanner";
import Sidebar from "../components/home/sidebar";
import Logo from "../components/common/logo";

const Home: NextPage = () => (
  <>
    <div className="drawer-mobile drawer">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar border-b-2 bg-base-100">
          <div className="flex-none lg:hidden">
            <label htmlFor="sidebar" className="btn btn-ghost btn-square">
              <Bars3Icon className="h-6 w-6" />
            </label>
          </div>

          <div className="flex-1">
            <Logo />
          </div>

          <NotificationButton />

          <ProfileButton />
        </div>
        <AdBanner />
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  </>
);

export default Home;
