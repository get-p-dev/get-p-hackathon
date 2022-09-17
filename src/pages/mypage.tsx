import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { BodyLayout } from "../components/common/bodylayout";
import TagList from "../components/common/tag-list";

export default function PeopleDetail() {
  const [cookie] = useCookies(["token"]);

  const { data: mydata } = useQuery(
    "mypage",
    async () => {
      const res = await axios.get("http://localhost:8080/users/profile", {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      const loadedData = await res.data;
      console.log(loadedData);
      if (loadedData.hasOwnProperty("company")) {
        const ret = await loadedData.company;
        console.log(ret);
        return ret;
      }
      const ret = await loadedData.people;
      console.log(ret);
      return ret;
    },
    {
      enabled: !!cookie.token,
    }
  );

  const { data: profileImage, isLoading } = useQuery(
    "profileImage",
    async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/images/${mydata.image}`,
          {
            responseType: "blob",
          }
        );
        return URL.createObjectURL(
          new Blob([res.data], { type: res.headers["content-type"] })
        );
      } catch (err) {
        return "";
      }
    },
    {
      enabled: !!mydata,
    }
  );

  if (isLoading) {
    return <pre>loading...</pre>;
  }

  return (
    <>
      <BodyLayout>
        <>
          <section className="relative mx-auto mb-24 flex max-w-2xl flex-col gap-4 border-gray-100 px-4 pt-12">
            <h2 className="mx-auto text-lg font-semibold">{`${mydata?.name}님의 프로필`}</h2>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative aspect-square w-40 overflow-hidden rounded-[35%]">
                {/* eslint-disable @next/next/no-img-element */}
                <Image
                  src={profileImage || "/profile.svg"}
                  alt="picture"
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{mydata?.name || "아무개"}</h3>
              <div className="flex flex-row items-center gap-1">
                <div className="relative flex aspect-square h-6 w-6 items-center">
                  <Image src="/like.svg" alt="like" layout="fill" />
                </div>
                <p className="text-md text-gray-600">{mydata?.likes || 0}</p>
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
                    {mydata?.participation || 0}회
                  </span>
                </div>
                <div className="grow rounded-lg bg-gray-50 p-4">
                  <span className="block text-sm font-bold text-gray-400">
                    성공 횟수
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {mydata?.success || "0"}회
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <span className="block text-sm font-bold text-gray-400">
                  총 보수
                </span>
                <span className="text-xl font-bold ">
                  {mydata?.totalPay?.toLocaleString() || 0}원
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-600">소개</h3>
              <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4">
                {mydata?.introduction || "소개 정보가 없습니다."}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-600">포트폴리오</h3>
              <div className="flex flex-row gap-2 whitespace-pre-wrap rounded-lg bg-gray-50 p-4 underline">
                <ArrowDownTrayIcon className="h-6 w-6" />
                {mydata?.name}의 포트폴리오.zip
              </div>
            </div>
            <h3 className="font-bold text-gray-600">태그</h3>
            <TagList tags={mydata?.hashtags} />
            <div className="space-y-4">
              <h3 className="font-bold text-gray-600">학교</h3>
              <div className="rounded-lg bg-gray-50 p-4">
                {mydata?.school || "학교 정보가 없습니다."}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-600">전공</h3>
              <div className="rounded-lg bg-gray-50 p-4">
                {mydata?.major || "전공 정보가 없습니다."}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-600">활동 지역</h3>
              <div className="rounded-lg bg-gray-50 p-4">
                {mydata?.activityArea || "활동 지역 정보가 없습니다."}
              </div>
            </div>
          </section>
        </>
      </BodyLayout>
    </>
  );
}
