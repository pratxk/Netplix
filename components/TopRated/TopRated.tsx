'use client';

import React, { useState, useEffect } from 'react';
import Slider from '../Slider';
import ToggleSwitch from '../TabsSwitch/ToggleSwitch';
import LoadingState from '../LoadingState';
import { TopRatedMovie, TopRatedTvShow } from '@/types/global';

interface TopRatedProps {
  initialData: {
    results: TopRatedMovie[];
  };
}

const TopRated: React.FC<TopRatedProps> = ({ initialData }) => {
  const [topRatedMovies, setTopRatedMovies] = useState<TopRatedMovie[]>(initialData.results);
  const [topRatedTvShows, setTopRatedTvShows] = useState<TopRatedTvShow[]>([]);
  const [state, setState] = useState<boolean>(true);
  const [loadingTvShows, setLoadingTvShows] = useState<boolean>(false);

  const handleState = (value: boolean) => {
    setState(value);
  };

  const getTopRatedTvShows = async () => {
    setLoadingTvShows(true);
    try {
      const response = await fetch('/api/top-rated?mediaType=tv&page=1');
      const data = await response.json();
      setTopRatedTvShows(data.results);
    } catch (error) {
      console.error('Error fetching top-rated TV shows:', error);
    } finally {
      setLoadingTvShows(false);
    }
  };

  useEffect(() => {
    getTopRatedTvShows();
  }, []);

  const isLoading = !state && loadingTvShows && topRatedTvShows.length === 0;

  if (isLoading) {
    return <LoadingState message="Loading top-rated TV shows..." />;
  }

  return (
    <div className="mb-4">
      <div className="flex mb-6 justify-between items-center text-center">
        <div>
          <h2 className="font-medium text-2xl text-white section-title">
            Top Rated
          </h2>
        </div>
        <ToggleSwitch onClick={handleState} val1={"Movies"} val2={"TV Shows"} />
      </div>
      <div>
        <Slider type={state ? topRatedMovies : topRatedTvShows} url={state ? '/movies/' : '/tvshows/'} />
      </div>
    </div>
  );
};

export default TopRated;
