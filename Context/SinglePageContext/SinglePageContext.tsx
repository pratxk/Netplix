'use client';

import { createContext, useState, ReactNode } from "react";
import axios from 'axios';
import { 
  SingleMovie, 
  SinglePageContextType, 
  ContextProviderProps 
} from '@/types/global';

export const singlePageContext = createContext<SinglePageContextType | undefined>(undefined);

export const SingleContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [singleMovie, setSingleMovie] = useState<SingleMovie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingSingleMovie, setLoadingSingleMovie] = useState<boolean>(false);

  const getSingleMovie = async (id: number): Promise<void> => {
    setLoadingSingleMovie(true);
    setError(null);
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, config);
      const movie = res.data;
      console.log('Movie', movie);
      setSingleMovie(movie);
      setLoadingSingleMovie(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setLoadingSingleMovie(false);
    }
  };

  return (
    <singlePageContext.Provider
      value={{
        singleMovie,
        error,
        getSingleMovie,
        loadingSingleMovie,
      }}
    >
      {children}
    </singlePageContext.Provider>
  );
};

