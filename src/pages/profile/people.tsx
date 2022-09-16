import { useAutoAnimate } from "@formkit/auto-animate/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "../../components/common/logo";
import { hslMaker } from "../../utils";

const PeopleProfileSchema = z.object({
  name: z.string(),
  school: z.string(),
  major: z.string(),
  activityArea: z.string(),
  introduction: z.string(),
  portfolio: z.string(),
  phoneNumber: z.string(),
  tags: z.array(z.string()),
  userObjectId: z.string(),
});

type PeopleProfileProps = z.infer<typeof PeopleProfileSchema>;

const onValid: SubmitHandler<PeopleProfileProps> = (data) => {
  console.log(data);
};

export default function People() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PeopleProfileProps>();
  const router = useRouter();
  const [animationRef] = useAutoAnimate<HTMLUListElement>();
  const [selectedTag, setSelectedTag] = useState<
    { content: string; color: string }[]
  >([]);
  const [tag, setTag] = useState("");

  return (
    <main className="my-4 grid h-screen place-items-center px-4 lg:px-0">
      <div className="card w-full max-w-lg border-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <figure className="flex w-full justify-center">
            <Logo />
          </figure>
          <h2 className="card-title pt-8">피플 프로필 등록</h2>
          <form
            onSubmit={handleSubmit(async (data) => {
              const res = await onValid(data);
              router.push(`/`);
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
                type="text"
                placeholder="전화번호를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("phoneNumber", { required: true })}
              />

              <label className="label" htmlFor="tags">
                <span className="label-text">
                  태그를 작성해주세요. (최대 8개)
                </span>
              </label>

              <div className="textarea textarea-bordered ">
                <ul className="flex flex-wrap gap-1 pt-1" ref={animationRef}>
                  {selectedTag.map((tag) => (
                    <li
                      key={`${tag.content}`}
                      style={{
                        backgroundColor: tag.color || hslMaker(tag.content),
                      }}
                      className={`flex h-fit w-fit cursor-pointer select-none flex-row gap-2 rounded-lg px-2 py-1 text-base-100`}
                      onClick={() => {
                        setSelectedTag(
                          selectedTag.filter((t) => t.content !== tag.content)
                        );
                      }}
                    >
                      <p className="shrink-0">{tag.content}</p>
                      <XMarkIcon className="w-4 shrink-0" />
                    </li>
                  ))}
                  {selectedTag.length < 8 && (
                    <input
                      {...register("tags")}
                      placeholder="태그를 입력해주세요."
                      className="h-fit w-fit border-white py-1 px-2 outline-none ring-white"
                      disabled={selectedTag.length >= 8}
                      value={tag}
                      onKeyPress={(e) => {
                        if (selectedTag.length >= 8) return;
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (!tag) return;
                          if (selectedTag.find((t) => t.content === tag))
                            return;
                          setSelectedTag((prev) => [
                            ...prev,
                            { content: tag, color: hslMaker(tag) },
                          ]);
                          setTag("");
                        }
                        return;
                      }}
                      onChange={(e) => {
                        if (selectedTag.length >= 8) return;
                        setTag(e.target.value);
                      }}
                    />
                  )}
                </ul>
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
