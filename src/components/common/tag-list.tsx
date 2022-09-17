import React from "react";
import { hslMaker } from "../../utils";

const TagList = ({ tags }: { tags: string[] | undefined }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2 text-sm text-gray-400">
      {tags?.map((data, index) => {
        return (
          <div
            key={index}
            className="shrink-0 rounded-lg px-2 py-1 text-white"
            style={{ backgroundColor: hslMaker(data) }}
          >
            {data}
          </div>
        );
      })}
    </div>
  );
};

export default TagList;
