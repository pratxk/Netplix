'use client';

import { createContext, useState, ReactNode } from "react";
import axios from 'axios';
import { 
  InfiniteMovie, 
  InfiniteTvShow, 
  InfiniteContextType, 
  ContextProviderProps 
} from '@/types/global';

export const infiniteContext = createContext<InfiniteContextType | undefined>(undefined);

export const InfiniteContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [infiniteMovies, setInfiniteMovies] = useState<InfiniteMovie[]>([]);
  const [infiniteTvShows, setInfiniteTvShows] = useState<InfiniteTvShow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const getInfiniteTvShows = async (p: number, genre_id: string = '', sort: string = ''): Promise<InfiniteTvShow[] | undefined> => {
    setLoading(true);
    setError(null);
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${p}&sort_by=popularity.${sort}&with_genres=${genre_id}`, config);
      const tvshows = res.data;
      console.log('TvShows-infinite', tvshows.results);
      const mainData = tvshows.results;
      setLoading(false);
      return mainData;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setLoading(false);
      return undefined;
    }
  };

  const getInfiniteMovies = async (p: number, genre_id: string = '', sort: string = ''): Promise<InfiniteMovie[] | undefined> => {
    setLoading(true);
    setError(null);
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${p}&sort_by=popularity.${sort}&with_genres=${genre_id}`, config);
      const movie = res.data;
      console.log('Movies-infinite', movie.results);
      const movies = movie.results;
      setLoading(false);
      return movies;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setLoading(false);
      return undefined;
    }
  };

  return (
    <infiniteContext.Provider
      value={{
        infiniteMovies,
        error,
        page,
        setPage,
        setInfiniteMovies,
        getInfiniteMovies,
        loading,
        infiniteTvShows,
        setInfiniteTvShows,
        getInfiniteTvShows,
      }}
    >
      {children}
    </infiniteContext.Provider>
  );
};

