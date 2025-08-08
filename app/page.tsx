import React from 'react';
import Trending from '@/components/Trending/Trending';
import Popular from '@/components/Popular/Popular';
import TopRated from '@/components/TopRated/TopRated';
import SearchFormWrapper from '@/components/Forms/SearchFormWrapper';
import { fetchTrendingData, fetchPopularData, fetchTopRatedData } from '@/lib/api';

const HeroImage = [
    "https://image.tmdb.org/t/p/original/yHzyPJrVqlTySQ9mc379yxrLBYQ.jpg",
    "https://image.tmdb.org/t/p/original/en3GU5uGkKaYmSyetHV4csHHiH3.jpg",
    "https://image.tmdb.org/t/p/original/blqiNjJefmY10Wx6y2vgJJWljJj.jpg",
    "https://image.tmdb.org/t/p/original/sjC29cgm4qZAnpOJQbYKCxDCcra.jpg",
    "https://image.tmdb.org/t/p/original/h9YlRHAZWOWtGonllmj6JJg1FrE.jpg",
    "https://image.tmdb.org/t/p/original/tAwfoDyKiYa4KQdUp3DTMrEs4En.jpg",
    "https://image.tmdb.org/t/p/original/9juRmk8QjcsUcbrevVu5t8VZy5G.jpg",
    "https://image.tmdb.org/t/p/original/wkPPRIducGfsbaUPsWfw0MCQdX7.jpg",
    "https://image.tmdb.org/t/p/original/hdFIdXwS8FSN2wIsuotjW1mshI0.jpg",
    "https://image.tmdb.org/t/p/original/62zw627mH74rng9zc4tFfaR54KW.jpg",
    "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    "https://image.tmdb.org/t/p/original/sjC29cgm4qZAnpOJQbYKCxDCcra.jpg",
];

function getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * HeroImage.length);
    return HeroImage[randomIndex];
}

export default async function HomePage() {
  // Server-side data fetching with error handling
  let trendingData, popularData, topRatedData;
  try {
    [trendingData, popularData, topRatedData] = await Promise.allSettled([
      fetchTrendingData('all', 'day'),
      fetchPopularData('movie', 1),
      fetchTopRatedData('movie', 1)
    ]);
    trendingData = trendingData.status === 'fulfilled' ? trendingData.value : { results: [] };
    popularData = popularData.status === 'fulfilled' ? popularData.value : { results: [] };
    topRatedData = topRatedData.status === 'fulfilled' ? topRatedData.value : { results: [] };
  } catch (error) {
    console.error('Error fetching data:', error);
    trendingData = { results: [] };
    popularData = { results: [] };
    topRatedData = { results: [] };
  }

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#0a101c] to-[#1a202c] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 transition-all duration-1000"
          style={{
            backgroundImage: `url(${getRandomImage()})`,
            filter: 'brightness(0.6) blur(2px) contrast(0.9)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 md:px-8 lg:px-16 py-20 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white drop-shadow-lg tracking-tight">
              Welcome to <span className="text-hotpink">Netplix</span>
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-200 mb-8">
              Millions of movies, TV shows and people to discover. Explore now.
            </h2>
          </div>
          <div className="w-full max-w-xl mt-6">
            <SearchFormWrapper />
          </div>
        </div>
      </section>
      <section className="px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 py-8 md:py-16 bg-gradient-to-b from-[#0a101c] to-[#1a202c]">
        <div className="max-w-7xl mx-auto">
          <div className="pt-8 md:pt-16">
            <Trending initialData={trendingData} />
          </div>
          <div className="mt-12 md:mt-20">
            <Popular initialData={popularData} />
          </div>
          <div className="mt-12 md:mt-20 mb-8">
            <TopRated initialData={topRatedData} />
          </div>
        </div>
      </section>
    </>
  );
}
