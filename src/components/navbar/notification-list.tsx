import Link from "next/link";
import { NotificationListProps } from "./notification-button";

export default function NotificationList({
  notifications,
}: {
  notifications: NotificationListProps[];
}) {
  return (
    <div
      tabIndex={0}
      className="dropdown-content menu mt-3 h-72 w-72 divide-y divide-solid overflow-y-auto rounded-lg border-2 bg-base-100 shadow-lg"
    >
      {notifications.map((item) => {
        return (
          <li key={item.id} className="even:bg-gray-50">
            <Link href={item.href}>
              <a className="flex flex-col items-start gap-1">
                <h3 className="text-md text-base-content">{item.title}</h3>
                <p className="text-2xs text-gray-400">{item.date}</p>
                <p className="text-sm text-base-content">{item.description}</p>
              </a>
            </Link>
          </li>
        );
      })}
    </div>
  );
}
