import { BellIcon } from "@heroicons/react/24/outline";
import { useCookies } from "react-cookie";
import NotificationList from "./notification-list";

export type NotificationListProps = {
  id: number;
  title: string;
  date: string;
  description: string;
  href: string;
};

const notifications_dummy = [
  {
    id: 1,
    title: "새로운 제안서가 도착했습니다.",
    date: "2022-10-19",
    description: '"GET-P"로부터 제안서가 도착했습니다.',
    href: "#",
  },
  {
    id: 2,
    title: "새로운 제안서가 도착했습니다",
    date: "2022-10-18",
    description: '"KERT"로부터 제안서가 도착했습니다.',
    href: "#",
  },
  {
    id: 3,
    title: "새로운 채팅이 도착했습니다.",
    date: "2022-10-16",
    description: '"네모감성"으로부터 채팅이 도착했습니다.',
    href: "#",
  },
  {
    id: 4,
    title: "새로운 제안서가 도착했습니다.",
    date: "2022-10-15",
    description: '"ㅇㅇㅇ"로부터 제안서가 도착했습니다.',
    href: "#",
  },
  {
    id: 5,
    title: "새로운 채팅이 도착했습니다.",
    date: "2022-10-14",
    description: '"ㅇㅇㅇ"로부터 채팅이 도착했습니다.',
    href: "#",
  },
  {
    id: 6,
    title: "Notification 6",
    date: "2022-09-12",
    description: "Description 6",
    href: "#",
  },
  {
    id: 7,
    title: "Notification 7",
    date: "2022-09-12",
    description: "Description 7",
    href: "#",
  },
];

function useNotification({ token }: { token: string | null }) {
  // fetch notifications using userID
  return notifications_dummy;
}

export default function NotificationButton() {
  const [cookie] = useCookies(["token"]);

  const notifications = useNotification(cookie?.token || "");

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <div>
            <BellIcon className="h-6 w-6" />
          </div>
          <span className="badge indicator-item badge-accent badge-sm text-white">
            {notifications?.length || 0}
          </span>
        </div>
      </label>

      <NotificationList notifications={notifications} />
    </div>
  );
}
