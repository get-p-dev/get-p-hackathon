// 지원자 채팅
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { PaperAirplaneIcon, PlusIcon } from "@heroicons/react/24/outline";
import Message from "../../../components/chat/chat";
import { BodyLayout } from "../../../components/common/bodylayout";
import pusherJs from "pusher-js";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

export interface ChatInputs {
  chat: string;
}

interface UserProps {
  userId: string;
  name?: string;
  userType: string;
}

export interface ChatProps {
  user: UserProps;
  chat: string;
  createdAt: string;
}

const ProjectUserChat = () => {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, watch, resetField } = useForm<ChatProps>({
    mode: "onSubmit",
  });
  const [cookies] = useCookies(["token"]);

  // * change with real server call
  const currentUser = {
    userId: "1",
    name: "김현우",
    userType: "people",
  };

  const [data, setData] = React.useState<ChatProps[]>([] as ChatProps[]);

  const onValid: SubmitHandler<ChatProps> = async (data) => {
    console.log("hi");
    console.log(data);
    const newChat = {
      user: currentUser,
      chat: data.chat,
      createdAt: new Date().toTimeString().split(" ")[0],
    } as ChatProps;

    await axios.post(
      "http://localhost:8080/pusher/messages",
      { message: newChat },
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );
    resetField("chat");
    scrollRef?.current?.scrollIntoView();
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pusher = new pusherJs("e1995a9688b13e4fb55e", {
      cluster: "ap3",
    });
    console.log(id);
    const channel = pusher.subscribe(id as string);
    channel.bind("message", function (data: any) {
      setData((prev) => {
        console.log(data);
        return prev && [...prev, data];
      });
    });
  });

  return (
    <BodyLayout>
      <div className="relative flex flex-col pt-10 pb-36">
        <span className="mx-auto w-fit rounded-lg bg-gray-200 py-2 px-4">
          채팅방이 개설되었습니다.
        </span>
        <div className="flex flex-col gap-4">
          {data?.map((chat, index) => (
            <Message
              key={index}
              chat={chat}
              reversed={chat.user.userId === currentUser.userId}
            />
          ))}
          <div ref={scrollRef} className="h-20"></div>
        </div>
      </div>

      <div className="fixed bottom-0 block w-full max-w-2xl border-2 bg-white">
        <form
          method="POST"
          onSubmit={handleSubmit(onValid)}
          className="flex flex-row items-center gap-4 px-4 py-4"
        >
          <div className="transition-transition cursor-pointer rounded-full border-2 duration-300 ease-in-out hover:bg-gray-200">
            <label
              htmlFor="file"
              className="relative flex aspect-square h-8 items-center justify-center"
            >
              <PlusIcon className="h-6 w-6" />
            </label>
            <input id="file" type="file" className="hidden " />
          </div>
          <input
            spellCheck="false"
            className="grow appearance-none rounded-full border-2 border-gray-400 px-4 py-2 tracking-wide placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="메세지를 입력하세요."
            {...register("chat", { required: true })}
          />
          <button className="rounded-full bg-blue-400 px-2 py-2">
            <PaperAirplaneIcon className="h-6 w-6 text-white" />
          </button>
        </form>

        <div className="bg-gray-100 p-5 font-bold text-blue-500 ">
          프로젝트 수행 확정하기
        </div>
      </div>
    </BodyLayout>
  );
};

export default ProjectUserChat;
