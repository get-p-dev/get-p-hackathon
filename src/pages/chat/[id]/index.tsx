// 지원자 채팅
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { PaperAirplaneIcon, PlusIcon } from "@heroicons/react/24/outline";
import Message from "../../../components/chat/chat";
import { BodyLayout } from "../../../components/common/bodylayout";

const messages = [
  {
    id: 1,
    user: {
      name: "김피엠",
      userType: "매니저",
    },
    message: "안녕하세요. GET-P 김피엠 매니저 입니다.",
    reversed: false,
  },
  {
    id: 2,
    user: {
      name: "김피엠",
      userType: "매니저",
    },
    message: "의뢰자님의 요청에 따라 톡방이 개설되었습니다.",
    reversed: false,
  },
  {
    id: 3,
    user: {
      name: "김수현",
      userType: "피플",
    },
    message: "안녕하세요~ 김수현 입니다.",
    reversed: false,
  },
  {
    id: 4,
    user: {
      name: "김피엠",
      userType: "매니저",
    },
    message: "유의사항 및 계약 내용 참고 자료 송부드립니다.",
    reversed: false,
  },
  {
    id: 5,
    user: {
      name: "김피엠",
      userType: "매니저",
    },
    message: "GET-P 유의사항.pdf",
    reversed: false,
    underline: true,
  },
  {
    id: 6,
    user: {
      name: "나",
      userType: "의뢰자",
    },
    message: "네 확인해보겠습니다.",
    reversed: true,
  },
];

const ProjectUserChat = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, resetField } = useForm<any>({
    mode: "onSubmit",
  });
  const [data, setData] = React.useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onValid: SubmitHandler<any> = async (data) => {
    scrollRef?.current?.scrollIntoView();
    resetField("chat");
  };

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        if (prev.length < messages.length) {
          scrollRef?.current?.scrollIntoView();
          return [...prev, messages[prev.length]];
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <BodyLayout>
        <section className="flex h-[calc(100vh-68px)] flex-col">
          <div className="relative flex grow flex-col overflow-y-auto pt-10 pb-36">
            <span className="mx-auto w-fit rounded-lg bg-gray-200 py-2 px-4">
              채팅방이 개설되었습니다.
            </span>
            <div className="flex flex-col gap-4">
              {data &&
                data?.map((chat, index) => (
                  <Message key={index} chat={chat} reversed={chat?.reversed} />
                ))}
              <div ref={scrollRef} className="h-20"></div>
            </div>
          </div>

          <div className="drawer-content right-0 w-full grow-0 border-2 border-l-0 bg-white">
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

            <label
              htmlFor="accept"
              className="modal-button btn btn-primary ml-4 mb-4"
            >
              프로젝트 수행 확정하기
            </label>
          </div>
        </section>
      </BodyLayout>

      <input type="checkbox" id="accept" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">프로젝트 수행 확정하기</h3>
          <p className="py-4">
            오프라인 미팅 후에는 프로젝트 수행 확정을 취소할 수 없습니다. 그래도
            확정하시겠습니까?
          </p>
          <div className="modal-action">
            <label
              htmlFor="accept"
              className="btn"
              onClick={() => {
                setData(() => {
                  return [
                    ...data,
                    {
                      id: 7,
                      user: {
                        name: "나",
                        userType: "의뢰자",
                      },
                      message: "계약서.hwp",
                      reversed: true,
                      underline: true,
                    },
                  ];
                });
              }}
            >
              확정하기
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectUserChat;
