'use client';

import { createContext, useState, useEffect, ReactNode } from "react";
import axios from 'axios';
import { 
  PopularMovie, 
  PopularTvShow, 
  PopularContextType, 
  ContextProviderProps 
} from '@/types/global';

export const popularContext = createContext<PopularContextType | undefined>(undefined);

export const PopularContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState<PopularMovie[]>([]);
  const [popularTvShows, setPopularTvShows] = useState<PopularTvShow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<boolean>(true);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(true);
  const [isLoadingTvShows, setIsLoadingTvShows] = useState<boolean>(true);

  const getPopularTvShows = async (): Promise<void> => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', config);
      const tvshow = res.data;
      console.log('tvShow', tvshow);
      setPopularTvShows(tvshow.results);
      setTimeout(() => {
        console.log(popularTvShows);
      }, 5000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoadingTvShows(false);
    }
  };

  const getPopularMovies = async (): Promise<void> => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', config);
      const movie = res.data;
      console.log('Movie', movie);
      setPopularMovies(movie.results);
      setTimeout(() => {
        console.log(popularMovies);
      }, 5000);
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
    <popularContext.Provider
      value={{
        popularMovies,
        error,
        popularTvShows,
        getPopularTvShows,
        state,
        handleState,
        getPopularMovies,
        isLoadingMovies,
        isLoadingTvShows,
      }}
    >
      {children}
    </popularContext.Provider>
  );
};

