import { Bars3Icon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { BodyLayout } from "../../components/common/bodylayout";
import LikeButton from "../../components/common/like-button";
import Logo from "../../components/common/logo";
import TagList from "../../components/common/tag-list";
import Sidebar from "../../components/home/sidebar";
import NotificationButton from "../../components/navbar/notification-button";
import ProfileButton from "../../components/navbar/profile-button";

const fetchUser = async (key: string, userId: string) => {
  const res = await axios.get(`http://localhost:8080/users/${userId}`);
  return res.data;
};

export default function PeopleDetail() {
  const [like, setLike] = useState(false);
  const router = useRouter();
  const { userId } = router.query;

  const { data: people, isLoading } = useQuery<any>(
    ["people", userId],
    async () => {
      try {
        const res = await axios.get("http://localhost:8080/people/" + userId);
        const people = await res.data;
        const image = await axios.get(
          "http://localhost:8080/images/" + people.image,
          {
            responseType: "blob",
          }
        );
        const peopleWithImage = {
          ...people,
          image: URL.createObjectURL(
            new Blob([image.data], { type: image.headers["content-type"] })
          ),
        };
        return peopleWithImage;
      } catch {
        return null;
      }
    },
    {
      enabled: !!userId,
    }
  );

  if (isLoading || !userId) {
    return <pre>loading...</pre>;
  }

  return (
    <>
      <BodyLayout>
        <>
          <section className="relative mx-auto flex max-w-2xl flex-col gap-4 border-gray-100 px-4 pt-10 pb-24 sm:pb-2">
            <h2 className="mx-auto text-lg font-semibold">{`${people?.name}님의 프로필`}</h2>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative aspect-square w-40 overflow-hidden rounded-[35%]">
                {/* eslint-disable @next/next/no-img-element */}
                <Image
                  src={people?.image || "/profile.svg"}
                  alt="picture"
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{people?.name || "아무개"}</h3>
              <div className="flex flex-row items-center gap-1">
                <div className="relative flex aspect-square h-6 w-6 items-center">
                  <Image src="/like.svg" alt="like" layout="fill" />
                </div>
                <p className="text-md text-gray-600">{people?.likes || 0}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-600">갯피 이력</h3>
              <div className="flex flex-row gap-4">
                <div className="grow rounded-lg bg-gray-50 p-4">
                  <span className="block text-sm font-bold text-gray-400">
                    참여 횟수
                  </span>
                  <span className="text-xl font-bold">
                    {people?.participation || 0}회
                  </span>
                </div>
                <div className="grow rounded-lg bg-gray-50 p-4">
                  <span className="block text-sm font-bold text-gray-400">
                    성공 횟수
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {people?.success || "0"}회
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <span className="block text-sm font-bold text-gray-400">
                  총 보수
                </span>
                <span className="text-xl font-bold ">
                  {people?.totalPay?.toLocaleString() || 0}원
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-600">학교</h3>
              <div className="rounded-lg bg-gray-50 p-4">
                {people?.school || "학교 정보가 없습니다."}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-600">전공</h3>
              <div className="rounded-lg bg-gray-50 p-4">
                {people?.major || "전공 정보가 없습니다."}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-600">활동 지역</h3>
              <div className="rounded-lg bg-gray-50 p-4">
                {people?.activityArea || "활동 지역 정보가 없습니다."}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-600">소개</h3>
              <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4">
                {people?.introduction || "소개 정보가 없습니다."}
              </div>
            </div>
            {/* <div className="space-y-4">
          <h3 className="font-bold text-gray-600">포트폴리오/첨부 파일</h3>
          {data?.attached?.map((item, index) => (
            <div
              className="flex flex-row items-center justify-between p-4 underline bg-gray-100 rounded-lg underline-offset-1"
              key={`${item[0]}_${index}`}
            >
              {item}
              <Image
                src="/download.svg"
                alt="download"
                width={24}
                height={24}
              />
            </div>
          ))}
        </div> */}
            <h3 className="font-bold text-gray-600">태그</h3>
            <TagList tags={people?.hashtags} />
            <div className="fixed bottom-4 left-4 right-4 flex h-16 flex-row items-center gap-2 sm:static sm:mt-4 sm:mb-4 sm:w-full">
              <button className="btn btn-primary grow">의뢰하기</button>
              <LikeButton
                hasShadow
                like={like}
                onClick={() => setLike((prev) => !prev)}
              />
            </div>
          </section>
        </>
      </BodyLayout>
    </>
  );
}
