import { useAutoAnimate } from "@formkit/auto-animate/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";
import { hslMaker } from "../../utils";

export default function TagInput({
  selectedTag,
  setSelectedTag,
  register,
  placeholder = "태그를 입력하세요",
}: {
  selectedTag: string[];
  setSelectedTag: Dispatch<SetStateAction<string[]>>;
  register: any;
  placeholder?: string;
}) {
  const [tag, setTag] = useState("");
  const [animationRef] = useAutoAnimate<HTMLUListElement>();
  const exceededTagsLimit = selectedTag.length >= 8;

  return (
    <div className="textarea textarea-bordered">
      <ul className="flex flex-wrap gap-1 pt-1" ref={animationRef}>
        {selectedTag.map((tag) => (
          <li
            key={`${tag}`}
            style={{
              backgroundColor: hslMaker(tag),
            }}
            className={`flex h-fit w-fit cursor-pointer select-none flex-row gap-2 rounded-lg px-2 py-1 text-base-100`}
            onClick={() => {
              setSelectedTag(selectedTag.filter((t) => t !== tag));
            }}
          >
            <p className="shrink-0">{tag}</p>
            <XMarkIcon className="w-4 shrink-0" />
          </li>
        ))}
        {selectedTag.length < 8 && (
          <input
            {...register}
            placeholder={placeholder}
            className="h-fit w-full border-white bg-transparent py-1 px-2 outline-none ring-white"
            disabled={exceededTagsLimit}
            value={tag}
            onKeyPress={(e) => {
              if (exceededTagsLimit) return;

              const isEnterPressed = e.key === "Enter";
              if (isEnterPressed) {
                e.preventDefault();
                const tagExists = selectedTag.find((t) => t === tag);

                if (!tag) return;
                if (tagExists) return;

                setSelectedTag((prev) => [...prev, tag]);
                setTag("");
              }
              return;
            }}
            onChange={(e) => {
              if (exceededTagsLimit) return;
              setTag(e.target.value);
            }}
          />
        )}
      </ul>
    </div>
  );
}
