'use client';

import React, { useState, useEffect } from 'react';
import Slider from '../Slider';
import ToggleSwitch from '../TabsSwitch/ToggleSwitch';
import LoadingState from '../LoadingState';
import { PopularMovie, PopularTvShow } from '@/types/global';

interface PopularProps {
  initialData: {
    results: PopularMovie[];
  };
}

const Popular: React.FC<PopularProps> = ({ initialData }) => {
  const [popularMovies, setPopularMovies] = useState<PopularMovie[]>(initialData.results);
  const [popularTvShows, setPopularTvShows] = useState<PopularTvShow[]>([]);
  const [state, setState] = useState<boolean>(true);
  const [loadingTvShows, setLoadingTvShows] = useState<boolean>(false);

  const handleState = (value: boolean) => {
    setState(value);
  };

  const getPopularTvShows = async () => {
    setLoadingTvShows(true);
    try {
      const response = await fetch('/api/popular?mediaType=tv&page=1');
      const data = await response.json();
      setPopularTvShows(data.results);
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
    } finally {
      setLoadingTvShows(false);
    }
  };

  useEffect(() => {
    getPopularTvShows();
  }, []);

  const isLoading = !state && loadingTvShows && popularTvShows.length === 0;

  if (isLoading) {
    return <LoadingState message="Loading popular TV shows..." />;
  }

  return (
    <div>
      <div className="flex justify-between mb-6 items-center text-center">
        <div>
          <h2 className="font-medium text-2xl text-white section-title">
            What's Popular
          </h2>
        </div>
        <ToggleSwitch val1={"Movies"} val2={"TV Shows"} onClick={handleState} />
      </div>
      <div>
        <Slider type={state ? popularMovies : popularTvShows} url={state ? '/movies/' : '/tvshows/'} />
      </div>
    </div>
  );
};

export default Popular;
