import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const SearchBar = () => {
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(text);
  };

  return (
    <>
      <div className="relative mx-auto mt-4 w-full max-w-6xl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full rounded-xl bg-gray-100 p-4 text-sm text-gray-800"
            placeholder="키워드로 검색해 보세요."
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="relative">
            <MagnifyingGlassIcon className="absolute right-4 h-6 w-6 translate-y-[-70%]" />
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
