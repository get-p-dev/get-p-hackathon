import axios from "axios";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { useQuery } from "react-query";
import TagList from "../common/tag-list";
import { PeopleProps } from "./people-list";

const handleClick = (router: NextRouter, id: string) => {
  router.push("/people/" + id);
};

const PeopleCard: React.FC<PeopleProps> = (person) => {
  const router = useRouter();
  const { data: profileImage, isLoading } = useQuery<any>(
    ["people", person.image],
    async () => {
      try {
        const image = await axios.get(
          "http://localhost:8080/images/" + person.image,
          {
            responseType: "blob",
          }
        );
        const profileImage = URL.createObjectURL(
          new Blob([image.data], { type: image.headers["content-type"] })
        );
        return profileImage;
      } catch {
        return "";
      }
    }
  );

  return (
    <div
      onClick={() => handleClick(router, person._id)}
      className="transition-color mx-auto flex w-full cursor-pointer flex-row items-center gap-5 divide-x-2 divide-y-2 divide-solid divide-gray-400 border-gray-100 px-8 py-5 duration-300 focus-within:bg-gray-50 hover:bg-gray-100"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-row gap-4">
        <div className="relative aspect-square h-32 w-32 shrink-0 overflow-hidden rounded-3xl sm:h-36 sm:w-36">
          <Image
            src={profileImage || "/profile.svg"}
            alt="picture"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="flex flex-row items-center gap-2">
            <span className="font-bold text-blue-600">
              {person.success || 0}회 완수
            </span>
            <p className="text-sm text-gray-400">{person.activityArea || 0}</p>
          </div>
          <p className="text-lg font-bold">{person.name || "anonymous"}</p>
          <p className="line-clamp-1 sm:line-clamp-2 max-w-sm pr-6 text-xs text-gray-600">
            {person.introduction || "undefined introduction"}
          </p>
          <TagList tags={person.hashtags} />
        </div>
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default PeopleCard;
