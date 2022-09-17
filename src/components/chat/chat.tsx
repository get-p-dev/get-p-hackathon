import React from "react";
import Image from "next/image";

const Message = ({ chat, reversed }: any) => {
  console.log("reversed >> ", reversed);
  return (
    <div className={`flex flex-col gap-2 ${reversed ? "mr-6" : "ml-6"}`}>
      {!reversed ? (
        <div className="flex items-center gap-2">
          <div className="flex h-fit w-fit flex-row items-start overflow-hidden rounded-3xl">
            <Image src={"/profile.svg"} alt="profile" width={60} height={60} />
          </div>
          <div>
            <p className="font-semibold">{chat.user.name}</p>
            <p>
              <span className="text-gray-600">{chat.user.name}</span>{" "}
              <span className="font-extralight text-gray-400">
                {chat.user.userType}
              </span>
            </p>
          </div>
        </div>
      ) : null}

      <div
        className={`
          flex items-end gap-2
          ${reversed ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          className={`
            flex w-fit max-w-sm flex-row items-start break-all rounded-b-lg p-4
            ${
              reversed
                ? "rounded-tl-lg bg-blue-100"
                : "rounded-tr-lg bg-gray-100"
            }`}
        >
          {chat.chat}
        </div>
        <div className={`"text-sm" ${reversed ? "text-right" : "text-left"}`}>
          {chat.createdAt}
        </div>
      </div>
    </div>
  );
};

export default Message;
