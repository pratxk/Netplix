'use client';
import { createContext, useState, useEffect, ReactNode } from "react";
import axios from 'axios';
import { 
  TrendingMovie, 
  TrendingContextType, 
  ContextProviderProps 
} from '@/types/global';

export const trendingContext = createContext<TrendingContextType | undefined>(undefined);

export const TrendingContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);
  const [trendingWeeklyMovies, setTrendingWeeklyMovies] = useState<TrendingMovie[]>([]);
  const [state, setState] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingDaily, setLoadingDaily] = useState<boolean>(false);
  const [loadingWeekly, setLoadingWeekly] = useState<boolean>(false);

  const getTrendingWeeklyMovies = async (): Promise<void> => {
    setLoadingWeekly(true);
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get('https://api.themoviedb.org/3/trending/movie/week?language=en-US', config);
      const movie = res.data;
      console.log('Movie', movie);
      setTrendingWeeklyMovies(movie.results);
      setLoadingWeekly(false);
      setTimeout(() => {
        console.log(trendingWeeklyMovies);
      }, 5000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setLoadingWeekly(false);
    }
  };

  const getTrendingMovies = async (): Promise<void> => {
    setLoadingDaily(true);
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US', config);
      const movie = res.data;
      console.log('Movie', movie);
      setTrendingMovies(movie.results);
      setLoadingDaily(false);
      setTimeout(() => {
        console.log(trendingMovies);
      }, 5000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setLoadingDaily(false);
    }
  };

  const handleState = (value: boolean): void => {
    setState(value);
  };

  return (
    <trendingContext.Provider
      value={{
        trendingMovies,
        trendingWeeklyMovies,
        state,
        getTrendingWeeklyMovies,
        handleState,
        error,
        getTrendingMovies,
        loadingDaily,
        loadingWeekly,
      }}
    >
      {children}
    </trendingContext.Provider>
  );
};

