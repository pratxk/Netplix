'use client';

import { createContext, useState, useEffect, ReactNode } from "react";
import axios from 'axios';
import { 
  SearchResult, 
  SearchContextType, 
  ContextProviderProps 
} from '@/types/global';

export const searchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchState, setSearchState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSearchResults = async (keyword: string): Promise<void> => {
    setLoading(true);
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=en-US&page=1`, config);
      const search = res.data;
      console.log('Key-Results', search.results);
      setSearchResults(search.results);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setLoading(false);
    }
  };

  console.log('checkFunc', searchResults);

  return (
    <searchContext.Provider
      value={{
        searchResults,
        error,
        getSearchResults,
        setSearchState,
        loading,
        setSearchResults,
        searchState,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

