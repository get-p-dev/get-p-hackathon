import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { ProjectProps } from "./project-list";

const ProjectCard: React.FC<ProjectProps> = ({
  _id,
  applicationDeadline,
  startDate,
  endDate,
  field,
  title,
  location,
  meeting,
  hashtags,
  successPay,
  likes,
}) => {
  const router = useRouter();

  return (
    <section
      className="transition-color mx-auto flex w-full cursor-pointer flex-col gap-1 border-gray-100 px-6 py-5 duration-300 focus-within:bg-gray-50 hover:bg-gray-100"
      key={_id}
      onClick={() => router.push(`/projects/${_id}`)}
    >
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex flex-row items-center justify-between gap-2">
          <span className="grow-0 text-lg font-bold text-blue-600">
            D-{new Date().getDate() - new Date(applicationDeadline).getDate()}
          </span>
          <p className="grow-0 text-sm text-gray-400">{location}</p>
          <p className="flex grow justify-end font-semibold text-orange-400">
            {meeting} 미팅
          </p>
        </div>
        <div className="text-lg font-bold">{title}</div>
        <div className="flex flex-row gap-2 text-sm text-gray-400">
          {hashtags.map((data, index) => {
            return <p key={index}>{data}</p>;
          })}
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="text-md font-semibold text-blue-600">
            프로젝트 성공 보수: {successPay.toLocaleString()}원
          </p>
          <div className="flex flex-row items-center gap-1">
            <div className="relative flex aspect-square h-6 w-6 items-center">
              <Image src="/like.svg" alt="like" layout="fill" />
            </div>
            <p className="text-md text-gray-600">{likes}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
