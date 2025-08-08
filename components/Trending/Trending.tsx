'use client';

import React, { useState, useEffect } from 'react';
import Slider from '../Slider';
import ToggleSwitch from '../TabsSwitch/ToggleSwitch';
import LoadingState from '../LoadingState';
import { TrendingMovie } from '@/types/global';

interface TrendingProps {
  initialData: {
    results: TrendingMovie[];
  };
}

const Trending: React.FC<TrendingProps> = ({ initialData }) => {
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>(initialData.results);
  const [trendingWeeklyMovies, setTrendingWeeklyMovies] = useState<TrendingMovie[]>([]);
  const [state, setState] = useState<boolean>(true);
  const [loadingWeekly, setLoadingWeekly] = useState<boolean>(false);

  const handleState = (value: boolean) => {
    setState(value);
  };

  const getTrendingWeeklyMovies = async () => {
    setLoadingWeekly(true);
    try {
      const response = await fetch('/api/trending?mediaType=all&timeWindow=week');
      const data = await response.json();
      setTrendingWeeklyMovies(data.results);
    } catch (error) {
      console.error('Error fetching weekly trending:', error);
    } finally {
      setLoadingWeekly(false);
    }
  };

  useEffect(() => {
    getTrendingWeeklyMovies();
  }, []);

  // Check if weekly data is still loading
  const isLoading = loadingWeekly && trendingWeeklyMovies.length === 0;

  if (isLoading) {
    return <LoadingState message="Loading trending data..." />;
  }

  return (
    <div>
      <div className="flex justify-between mb-6 items-center text-center">
        <div>
          <h2 className="font-medium text-2xl text-white section-title">
            Trending
          </h2>
        </div>
        <ToggleSwitch onClick={handleState} val1={"Day"} val2="Weekly" />
      </div>
      <div>
        <Slider type={state ? trendingMovies : trendingWeeklyMovies} url={'/movies/'} />
      </div>
    </div>
  );
};

export default Trending;
