import { BellIcon } from "@heroicons/react/24/outline";
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
    title: "Notification 1",
    date: "2022-09-12",
    description: "Description 1",
    href: "#",
  },
  {
    id: 2,
    title: "Notification 2",
    date: "2022-09-12",
    description: "Description 2",
    href: "#",
  },
  {
    id: 3,
    title: "Notification 3",
    date: "2022-09-12",
    description: "Description 3",
    href: "#",
  },
  {
    id: 4,
    title: "Notification 4",
    date: "2022-09-12",
    description: "Description 4",
    href: "#",
  },
  {
    id: 5,
    title: "Notification 5",
    date: "2022-09-12",
    description: "Description 5",
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

function useNotification({ token }: { token: string }) {
  // fetch notifications using userID
  return notifications_dummy;
}

export default function NotificationButton() {
  const token = { token: "JWT-Token" };
  const notifications = useNotification(token);

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
