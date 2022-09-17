import React from "react";
import SearchBar from "./search-bar";

export interface SearchProps {
  small?: boolean;
  option: string;
}

const Search: React.FC<SearchProps> = ({ small, option }) => {
  return (
    <section className="inset-0 mx-auto w-full max-w-6xl px-6 py-8">
      <h2
        className={`
          text-2xl font-semibold
        `}
      >
        어떤 {option} 찾으시나요?
      </h2>
      <SearchBar />
    </section>
  );
};

export default Search;
