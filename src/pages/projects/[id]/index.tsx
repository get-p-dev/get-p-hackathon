import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { BodyLayout } from "../../../components/common/bodylayout";
import LikeButton from "../../../components/common/like-button";
import { ProjectProps } from "../../../components/projects/project-list";

async function handleClick(id: string, token: string) {
  {
    /* loalhost:8080/projects/{project_id}/proposals, body { introduction: ""} */
  }
  console.log(token);
  const res = await axios.post(
    `http://localhost:8080/projects/${id}/proposals`,
    {
      introduction: "hello",
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await res.data;
}

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [like, setLike] = useState(false);
  const [cookie] = useCookies(["token"]);

  const { data: project, isLoading: isProjectLoading } = useQuery<ProjectProps>(
    ["project", id],
    async () => {
      const res = await axios.get(`http://localhost:8080/projects/${id}`);
      return await res.data;
    },
    {
      enabled: !!id,
    }
  );

  if (isProjectLoading) {
    return <pre>loading...</pre>;
  }

  return (
    <BodyLayout>
      <section className="relative flex flex-col gap-4 border-gray-100 px-4 py-6 pb-24 sm:pb-0">
        <div className="flex flex-row items-center gap-2">
          <span className="rounded-md bg-blue-600 px-2 py-1 text-xs font-light text-white">
            D-
            {project
              ? new Date().getDate() -
                new Date(project?.applicationDeadline).getDate()
              : 0}
          </span>
          <p className="grow-0 text-sm text-gray-400">
            {project?.meeting} 미팅
          </p>
        </div>
        <div className="text-2xl font-bold">{project?.title}</div>
        <div className="flex flex-row gap-2 border-b-2 border-gray-100 pb-4 text-sm text-gray-400">
          {project?.hashtags?.map((data, index) => {
            return <p key={index}>{data}</p>;
          })}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="text-md flex flex-row items-center gap-2 text-gray-500">
            <BuildingOffice2Icon className="h-6 w-6" />
            {project?.title}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="relative flex aspect-square h-6 w-6 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/like.svg" alt="like" />
            </div>
            <p className="text-md text-gray-600">{project?.likes}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between rounded-lg bg-blue-50 p-4 font-semibold">
            <span>프로젝트 성공 보수</span>{" "}
            <span className="text-blue-600">{project?.successPay}</span>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-gray-600">상세 설명</h3>
          <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 leading-5">
            {project?.field}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-gray-600">프로젝트 시작일</h3>
          <div className="rounded-lg bg-gray-50 p-4">
            {project?.startDate &&
              new Date(project?.startDate).toLocaleDateString("ko-KR")}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-gray-600">프로젝트 마감일</h3>
          <div className="rounded-lg bg-gray-50 p-4">
            {project?.endDate &&
              new Date(project?.endDate).toLocaleDateString("ko-KR")}
          </div>
        </div>
        <div className="fixed bottom-4 left-4 right-4 flex h-16 flex-row items-center gap-2 sm:static sm:mt-6 sm:w-full">
          <button
            disabled={!id}
            className="btn btn-primary grow"
            onClick={async () => {
              const res = await handleClick(id as string, cookie.token);
              router.push("/chat/" + res._id);
            }}
          >
            지원하기
          </button>

          <LikeButton
            hasShadow
            onClick={() => setLike((prev) => !prev)}
            like={like}
          />
        </div>
      </section>
    </BodyLayout>
  );
}

// localhost:8080/pusher/messages
// { userId, meesage }
