import { BuildingOffice2Icon, UsersIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Logo from "../../components/common/logo";

export type SignInProps = {
  email: string;
  password: string;
  passwordConfirm: string;
  type: string;
};

async function onValid(data: SignInProps, router: NextRouter) {
  const { email, password } = data;
  const req = { email, password };
  const res = await axios.post("http://localhost:8080/users", req);
  router.push(`/profile/${data.type}`);
  // POST to server
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInProps>();
  const router = useRouter();

  return (
    <main className="grid h-screen place-items-center px-4 lg:px-0">
      <div className="p- card w-full max-w-lg border-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <figure>
            <Logo />
          </figure>
          <h2 className="card-title pt-8">회원가입</h2>
          <form
            onSubmit={handleSubmit((data) => onValid(data, router))}
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
            </div>
            <div className="flex w-full justify-around gap-2">
              <label
                className={`label flex w-full cursor-pointer flex-col gap-2 rounded-lg py-4 transition-colors duration-300 ease-out ${
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
                className={`ease-out" label flex w-full cursor-pointer flex-col gap-2 rounded-lg py-4 transition-colors duration-300 ${
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
