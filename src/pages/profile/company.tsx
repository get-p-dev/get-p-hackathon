import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "../../components/common/logo";

const CompanyProfileSchema = z.object({
  name: z.string(),
  industry: z.string(),
  ceo: z.string(),
  introduction: z.string(),
  phoneNumber: z.string(),
  url: z.string(),
  address: z.string(),
  userObjectId: z.string(),
});

type CompanyProfileProps = z.infer<typeof CompanyProfileSchema> & {
  profilePicture: FileList;
};

async function onValid(
  data: CompanyProfileProps,
  cookie: string
): Promise<any> {
  console.log(data);
  // 1. 쿠키에 있는 토큰을 가져온다.
  // 2. 토큰을 헤더에 넣어서 요청을 보낸다.
  // 3. 요청이 성공하면 프로필 사진 등록 페이지로 이동한다.
  try {
    const res = await axios.post("http://localhost:8080/company", data, {
      headers: { Authorization: `Bearer ${cookie}` },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export default function Company() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyProfileProps>();
  const router = useRouter();
  const [cookie] = useCookies(["token"]);
  const [preview, setPreview] = useState("");

  return (
    <main className="grid place-items-center py-8 px-4 lg:px-0">
      <div className="p- card w-full max-w-lg border-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <figure>
            <Logo />
          </figure>
          <h2 className="card-title pt-8">의뢰자 프로필 등록</h2>
          <form
            onSubmit={handleSubmit(async (data) => {
              const res = await onValid(data, cookie.token);
              const successful = res.status >= 200 && res.status < 300;
              if (successful) {
                http: router.push("/profile/picture");
              }
            })}
            className="flex flex-col gap-4"
          >
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">회사명</span>
              </label>
              <input
                type="text"
                placeholder="회사명을 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("name", { required: true })}
              />
              <label className="label">
                <span className="label-text">업종</span>
              </label>
              <input
                type="text"
                placeholder="업종을 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("industry", { required: true })}
              />
              <label className="label">
                <span className="label-text">대표자</span>
              </label>
              <input
                type="text"
                placeholder="대표자를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("ceo", { required: true })}
              />
              <label className="label">
                <span className="label-text">소개 및 설명</span>
              </label>
              <textarea
                placeholder="회사에 대한 간단한 소개 및 설명을 입력하세요"
                className="textarea textarea-bordered w-full max-w-lg"
                {...register("introduction", { required: true })}
              />
              <h2
                className="label tooltip tooltip-right w-fit justify-start"
                data-tip="(매출, 재무, 근로 환경 등 귀사를 잘 표현할 수 있는 자료를 사진의 형태로 업로드 해주세요)"
              >
                <span className="label-text flex flex-row">
                  추가 자료{" "}
                  <QuestionMarkCircleIcon className="h-4 w-6 text-red-400" />
                </span>
              </h2>
              <input
                type="file"
                className="hidden w-full max-w-lg"
                accept="image/*"
                id="profilePicture"
                {...register("profilePicture", {
                  required: true,
                  onChange: (e) => {
                    if (!e?.target?.files) return;
                    if (!e.target.files[0]) return;
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  },
                })}
              />

              <label
                htmlFor="profilePicture"
                className="mx-auto w-fit cursor-pointer"
              >
                <div className="mx-4 overflow-hidden rounded-lg border-2 bg-cover transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview || "/banner2.jpeg"} alt="profile-picture" />
                </div>
              </label>
              <label className="label">
                <span className="label-text">대표자 전화번호</span>
              </label>
              <input
                type="text"
                placeholder="대표자 전화번호를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("phoneNumber", { required: true })}
              />
              <label className="label">
                <span className="label-text">웹사이트 주소</span>
              </label>
              <input
                type="text"
                placeholder="회사의 웹사이트 주소를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("url", { required: true })}
              />
              <label className="label">
                <span className="label-text">회사 주소</span>
              </label>
              <input
                type="text"
                placeholder="회사 주소를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("address", { required: true })}
              />
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
