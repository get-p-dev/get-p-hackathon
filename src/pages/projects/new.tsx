import { fail } from "assert";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BodyLayout } from "../../components/common/bodylayout";
import Logo from "../../components/common/logo";
import TagInput from "../../components/input/tag-input";

const ProjectSchema = z.object({
  meeting: z.string(),
  successPay: z.string(),
  failDeposit: z.string(),
  location: z.string(),
  category: z.string(),
  field: z.string(),
  title: z.string(),
  introduction: z.string(),
  applicationDeadline: z.date(),
  startDate: z.date(),
  endDate: z.date(),
  hashtags: z.array(z.string()),
});

type ProjectProps = z.infer<typeof ProjectSchema>;

async function onValid(data: ProjectProps, cookie: string): Promise<any> {
  try {
    const req = {
      ...data,
      successPay: Number(data.successPay),
      failDeposit: Number(data.failDeposit),
    };
    console.log(cookie);
    const res = await axios.post("http://localhost:8080/projects", req, {
      headers: { Authorization: `Bearer ${cookie}` },
    });
    return await res;
  } catch (err) {
    return err;
  }
}

export default function ProjectCreate() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectProps>();
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [cookie] = useCookies(["token"]);

  return (
    <BodyLayout>
      <main className="grid place-items-center px-4 py-8 lg:px-0">
        <div className="w-full max-w-4xl bg-base-100">
          <div className="px-4">
            <h2 className="pt-8 text-3xl font-bold">프로젝트 등록</h2>
            <form
              onSubmit={handleSubmit(async (data: ProjectProps) => {
                const req = {
                  ...data,
                  hashtags: selectedTag,
                };
                const res = await onValid(req, cookie.token);
                const successful = res.status >= 200 && res.status < 300;
                if (successful) {
                  router.push("/projects/" + res.data._id);
                }
              })}
              className="mt-10 flex flex-col gap-4"
            >
              <div className="form-control w-full max-w-4xl">
                <label className="label">
                  <span className="label-text">프로젝트 미팅 방식</span>
                </label>
                <input
                  type="text"
                  placeholder="프로젝트 미팅 방식을 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  {...register("meeting", { required: true })}
                />

                <label className="label">
                  <span className="label-text">성공 보수</span>
                </label>
                <input
                  type="number"
                  placeholder="성공 보수를 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  {...register("successPay", { required: true })}
                />

                <label className="label">
                  <span className="label-text">실패 보증금</span>
                </label>
                <input
                  type="number"
                  placeholder="실패 보증금을 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  {...register("failDeposit", { required: true })}
                />

                <label className="label">
                  <span className="label-text">프로젝트 위치</span>
                </label>
                <input
                  type="text"
                  placeholder="프로젝트 위치를 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  {...register("location", { required: true })}
                />

                <label className="label">
                  <span className="label-text">유형</span>
                </label>
                <input
                  type="text"
                  placeholder="프로젝트 유형을 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  {...register("category", { required: true })}
                />

                <label className="label">
                  <span className="label-text">분야</span>
                </label>
                <input
                  type="text"
                  placeholder="프로젝트 분야를 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  {...register("field", { required: true })}
                />

                <label className="label">
                  <span className="label-text">제목</span>
                </label>
                <input
                  type="text"
                  placeholder="프로젝트 제목을 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  {...register("title", { required: true })}
                />

                <label className="label">
                  <span className="label-text">상세 설명</span>
                </label>
                <input
                  type="text"
                  placeholder="프로젝트 상세 설명을 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  {...register("introduction", { required: true })}
                />

                <label className="label">
                  <span className="label-text">지원자 모집 마감일</span>
                </label>
                <input
                  type="date"
                  placeholder="지원자 모집 마감일을 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  {...register("applicationDeadline", { required: true })}
                />

                <label className="label">
                  <span className="label-text">작업 시작일</span>
                </label>
                <input
                  type="date"
                  placeholder="작업 시작일을 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  {...register("startDate", { required: true })}
                />

                <label className="label">
                  <span className="label-text">작업 마감일</span>
                </label>
                <input
                  type="date"
                  placeholder="작업 마감일을 입력하세요"
                  className="input input-bordered w-full max-w-4xl"
                  min={watch("startDate")?.toString()}
                  {...register("endDate", { required: true })}
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
                  프로젝트 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </BodyLayout>
  );
}
