'use client';
import { createContext, useState, useEffect, ReactNode } from "react";
import axios from 'axios';
import { 
  TopRatedMovie, 
  TopRatedTvShow, 
  TopRatedContextType, 
  ContextProviderProps 
} from '@/types/global';

export const topRatedContext = createContext<TopRatedContextType | undefined>(undefined);

export const TopRatedContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [topRatedMovies, setTopRatedMovies] = useState<TopRatedMovie[]>([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState<TopRatedTvShow[]>([]);
  const [state, setState] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(true);
  const [isLoadingTvShows, setIsLoadingTvShows] = useState<boolean>(true);

  const getTopRatedTvShows = async (): Promise<void> => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', config);
      const tvshows = res.data;
      setTopRatedTvShows(tvshows.results);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoadingTvShows(false);
    }
  };

  const getTopRatedMovies = async (): Promise<void> => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', config);
      const movie = res.data;
      setTopRatedMovies(movie.results);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoadingMovies(false);
    }
  };

  const handleState = (value: boolean): void => {
    setState(value);
  };

  return (
    <topRatedContext.Provider
      value={{
        topRatedMovies,
        error,
        state,
        topRatedTvShows,
        getTopRatedTvShows,
        handleState,
        getTopRatedMovies,
        isLoadingMovies,
        isLoadingTvShows,
      }}
    >
      {children}
    </topRatedContext.Provider>
  );
};

