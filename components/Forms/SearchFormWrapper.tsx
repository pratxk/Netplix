"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchFormWrapper: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex mt-6 rounded-l-[60px] w-full max-w-[45em] search-form">
      <form onSubmit={handleSubmit} className="w-full flex">
        <input
          className="rounded-l-[60px] bg-white h-[60px] flex-1 px-6 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={query}
          required
          onChange={handleChange}
          placeholder="Enter Your movie name"
        />
        <button
          className="text-white h-[60px] w-40 rounded-r-[60px] hover:opacity-90 transition-opacity duration-200 bg-gradient-to-r from-orange-400 to-pink-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFormWrapper;
