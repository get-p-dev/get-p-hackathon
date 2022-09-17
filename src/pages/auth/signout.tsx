import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function SignOut() {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  removeCookie("token", { path: "/" });

  return <></>;
}
