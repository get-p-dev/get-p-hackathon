import Link from "next/link";

const sidebarContent = [
  { name: "프로젝트 찾기", href: "/projects" },
  { name: "피플 찾기", href: "/people" },
  { name: "프로젝트 등록", href: "/projects/new" },
  { name: "구인 구직", href: "/people" },
  { name: "이용 가이드", href: "/guide" },
];

export default function Sidebar() {
  return (
    <ul className="menu w-60 overflow-y-auto border-2 border-t-0 bg-base-100 p-4 text-base-content">
      {/* <!-- Sidebar content here --> */}
      {sidebarContent.map((item) => {
        return (
          <li key={item.name}>
            <Link href={item.href}>
              <a className="p-4">{item.name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
