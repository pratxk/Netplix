'use client';
import React, { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { searchContext } from '../../Context/SearchContext/SearchContext';

const SearchForm: React.FC = () => {
  const contextValue = useContext(searchContext);
  
  if (!contextValue) {
    return null;
  }

  const { getSearchResults, setSearchState } = contextValue;
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.trim());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchState(true);
    getSearchResults(query);
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

export default SearchForm;
