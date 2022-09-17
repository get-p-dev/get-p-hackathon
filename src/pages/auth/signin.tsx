import Link from "next/link";
import { useForm } from "react-hook-form";
import Logo from "../../components/common/logo";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { router } from "@trpc/server";
import { useRouter } from "next/router";

export type SignInProps = {
  email: string;
  password: string;
};

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>();
  const router = useRouter();

  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <>
      <main className="grid place-items-center py-8 px-4 lg:px-0">
        <div className="p- card w-full max-w-lg border-2 bg-base-100 shadow-xl">
          <div className="card-body">
            <figure>
              <Logo />
            </figure>
            <h2 className="card-title pt-8">로그인</h2>
            <form
              onSubmit={handleSubmit((signinData: SignInProps) => {
                axios
                  .post("http://localhost:8080/auth/login", signinData)
                  .then((res) => {
                    console.log(res);
                    setCookie("token", res.data.accessToken, {
                      path: "/",
                      secure: true,
                      sameSite: "none",
                    });
                  })
                  .then(() => router.push("/"));
              })}
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
              </div>
              <div className="card-actions">
                <button className="btn btn-primary w-full text-base">
                  로그인
                </button>
              </div>
              <div className="card-actions">
                <Link href="/auth/signup">
                  <a className="btn-neutral btn w-full text-base text-neutral-content">
                    회원가입
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
