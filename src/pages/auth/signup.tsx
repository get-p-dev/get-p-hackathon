import { BuildingOffice2Icon, UsersIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { CookieSetOptions } from "universal-cookie";
import Logo from "../../components/common/logo";

export type SignInProps = {
  email: string;
  password: string;
  passwordConfirm: string;
  type: "company" | "people";
};

async function onValid(
  data: SignInProps,
  router: NextRouter,
  setCookie: (
    name: "token",
    value: any,
    options?: CookieSetOptions | undefined
  ) => void
) {
  const { email, password } = data;
  const req = { email, password };
  const res = await axios.post("http://localhost:8080/users", req);
  const successful = res.status >= 200 && res.status < 300;
  if (successful) {
    axios.post("http://localhost:8080/auth/login", req).then((res) => {
      console.log(res);
      setCookie("token", res.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      router.push(`/profile/${data.type}`);
    });
  }
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInProps>({
    defaultValues: {
      type: "company",
    },
  });
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <main className="grid place-items-center py-8 px-4 lg:px-0">
      <div className="p- card w-full max-w-lg border-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <figure>
            <Logo />
          </figure>
          <h2 className="card-title pt-8">회원가입</h2>
          <form
            onSubmit={handleSubmit((data) => onValid(data, router, setCookie))}
            className="flex flex-col gap-4"
          >
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">이메일</span>
              </label>
              <input
                type="text"
                placeholder="이메일을 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("email", { required: true })}
              />
              <label className="label">
                <span className="label-text">비밀번호</span>
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("password", { required: true })}
              />
              <label className="label">
                <span className="label-text">비밀번호 확인</span>
              </label>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("passwordConfirm", { required: true })}
              />
              <h3 className="label">
                <span className="label-text">회원 유형</span>
              </h3>
              <div className="flex w-full justify-around gap-2">
                <label
                  className={`label btn-ghost flex w-full cursor-pointer flex-col gap-2 rounded-lg border-2 py-4 transition-colors duration-300 ease-out ${
                    watch("type") === "company"
                      ? "bg-neutral text-neutral-content"
                      : "bg-none"
                  }`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    value="company"
                    {...register("type", { required: true })}
                  />
                  <BuildingOffice2Icon className="h-16 w-16" />
                  <span className="">의뢰자</span>
                </label>
                <label
                  className={`label btn-ghost flex w-full cursor-pointer flex-col gap-2 rounded-lg border-2 py-4 transition-colors duration-300 ease-out ${
                    watch("type") === "people"
                      ? "bg-neutral text-neutral-content"
                      : "bg-none"
                  }`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    value="people"
                    {...register("type", { required: true })}
                  />
                  <UsersIcon className="h-16 w-16" />
                  <span className="">피플</span>
                </label>
              </div>
            </div>
            <div className="card-actions">
              <button className="btn btn-primary w-full text-base">
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
