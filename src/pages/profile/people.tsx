import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "../../components/common/logo";
import TagInput from "../../components/input/tag-input";

const PeopleProfileSchema = z.object({
  name: z.string(),
  school: z.string(),
  major: z.string(),
  activityArea: z.string(),
  introduction: z.string(),
  portfolio: z.string(),
  phoneNumber: z.string(),
  hashtags: z.array(z.string()),
  userObjectId: z.string(),
});

type PeopleProfileProps = z.infer<typeof PeopleProfileSchema>;

async function onValid(data: PeopleProfileProps, cookie: string) {
  console.log(data);
  try {
    const res = await axios.post("http://localhost:8080/people", data, {
      headers: { Authorization: `Bearer ${cookie}` },
    });
    return res;
  } catch (err) {}
}

export default function People() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PeopleProfileProps>();
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [cookie] = useCookies(["token"]);

  return (
    <main className="my-4 grid place-items-center py-8 px-4 lg:px-0">
      <div className="card w-full max-w-lg border-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <figure className="flex w-full justify-center">
            <Logo />
          </figure>
          <h2 className="card-title pt-8">피플 프로필 등록</h2>
          <form
            onSubmit={handleSubmit(async (data) => {
              const req = { ...data, hashtags: selectedTag };
              const res: any = await onValid(req, cookie.token);
              const successful = res
                ? res.status >= 200 && res.status < 300
                : false;
              if (successful) {
                router.push("/profile/picture");
              }
            })}
            className="flex flex-col gap-4"
          >
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">이름</span>
              </label>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("name", { required: true })}
              />

              <label className="label">
                <span className="label-text">학교</span>
              </label>
              <input
                type="text"
                placeholder="학교를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("school", { required: true })}
              />

              <label className="label">
                <span className="label-text">전공</span>
              </label>
              <input
                type="text"
                placeholder="전공을 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("major", { required: true })}
              />

              <label className="label">
                <span className="label-text">활동 지역</span>
              </label>
              <input
                type="text"
                placeholder="활동 지역을 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("activityArea", { required: true })}
              />

              <label className="label">
                <span className="label-text">소개 및 설명</span>
              </label>
              <textarea
                placeholder="본인에 대한 간단한 소개 및 설명을 입력하세요"
                className="textarea textarea-bordered w-full max-w-lg"
                {...register("introduction", { required: true })}
              />

              <label className="label">
                <span className="label-text">포트폴리오</span>
              </label>
              <input
                type="text"
                placeholder="포트폴리오를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("portfolio", { required: true })}
              />

              <label className="label">
                <span className="label-text">전화번호</span>
              </label>
              <input
                type="tel"
                placeholder="전화번호를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("phoneNumber", { required: true })}
              />

              <label className="label" htmlFor="tags">
                <span className="label-text">
                  태그를 작성해주세요. (최대 8개)
                </span>
              </label>

              <TagInput
                register={register("hashtags")}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
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
