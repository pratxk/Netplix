'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CircularProgress from '@/components/Progress_Bars/CircularProgress';
import { genres } from '@/components/Trending/genres';
import { genresArray } from '@/components/genreArray';

// Skeleton Loader for grid
const SkeletonGrid: React.FC<{ count?: number }> = ({ count = 10 }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="animate-pulse bg-[#181e29] rounded-lg overflow-hidden shadow-md">
        <div className="w-full h-[300px] bg-gray-700" />
        <div className="p-4">
          <div className="h-4 bg-gray-600 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);
import { 
  Movie, 
  Genre, 
  MovieCardProps 
} from '@/types/global';

// MovieCard Component
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original/';
  
  return (
    <div className="movie-card">
      <Link href={`/movies/${movie.id}`}>
        <div className="m-auto relative">
          <img
            src={movie.poster_path ? `${baseUrl}${movie.poster_path}` : '/notAvailable.png'}
            alt={movie.name || movie.original_title}
            className="w-full h-[300px] rounded-[3%] object-cover"
          />
          <div className="absolute bottom-[15px] bg-transparent right-[20px] flex gap-[5px]">
            {movie.genre_ids?.slice(0, 2).map((ele) => {
              const genreName = genres[ele as keyof typeof genres];
              return (
                <span 
                  key={ele} 
                  className="font-bold text-[10px] bg-hotpink text-white px-2 py-1 rounded"
                >
                  {genreName}
                </span>
              );
            })}
          </div>
          <div className="absolute bottom-[-5px] left-0 rounded-full">
            <CircularProgress value={movie.vote_average} />
          </div>
        </div>
      </Link>
      <div className="pl-1 mt-3 text-left">
        <p className="pt-5 font-bold text-base text-white">
          {movie.original_title}
        </p>
        <p className="pb-5 font-bold text-sm text-white">
          {movie.release_date}
        </p>
      </div>
    </div>
  );
};

// Main Movies Page Component
const MoviesPage: React.FC = () => {
  const [infiniteMovies, setInfiniteMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const fetchMovies = async (pageNum: number, genre?: string, sort?: string) => {
    setLoading(true);
    try {
      let url = `/api/popular?mediaType=movie&page=${pageNum}`;
      if (genre) {
        url += `&with_genres=${genre}`;
      }
      if (sort) {
        url += `&sort_by=${sort}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const increasePageNumber = () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000) {
      setPage(page + 1);
    }
  };


  // Just update state, let useEffect handle fetching
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  // Fetch movies when page, genre, or sort changes
  useEffect(() => {
    setLoading(true);
    const loadMovies = async () => {
      const movies = await fetchMovies(page, selectedGenre, sortBy);
      if (movies) {
        if (page === 1) {
          setInfiniteMovies(movies);
        } else {
          setInfiniteMovies(prev => [...prev, ...movies]);
        }
      }
    };
    loadMovies();
    // eslint-disable-next-line
  }, [page, selectedGenre, sortBy]);

  useEffect(() => {
    window.addEventListener('scroll', increasePageNumber);
    return () => {
      window.removeEventListener('scroll', increasePageNumber);
    };
  }, [infiniteMovies]);


  // Show skeleton grid while loading first page
  if (loading && page === 1) {
    return (
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 mt-4 section bg-[#010d21]">
        <div className="flex justify-between mb-6 items-center text-center">
          <div>
            <h1 className="font-medium text-2xl text-white section-title">Explore Movies</h1>
          </div>
          <div className="flex gap-4">
            <select
              className="rounded-[40px] bg-[#173d77] text-white px-4 py-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              onChange={handleGenreChange}
              value={selectedGenre}
            >
              <option value="">Select Genre</option>
              {genresArray.map((ele: Genre) => (
                <option key={ele.id} value={ele.id} className="text-black">
                  {ele.genre}
                </option>
              ))}
            </select>
            <select
              className="rounded-[40px] bg-[#173d77] text-white px-4 py-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              onChange={handleSortChange}
              value={sortBy}
            >
              <option value="">Sort By</option>
              <option value="asc" className="text-black">Ascending</option>
              <option value="desc" className="text-black">Descending</option>
            </select>
          </div>
        </div>
        <SkeletonGrid count={10} />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-16 section bg-[#010d21]">
      <div className="flex justify-between mb-6 items-center text-center">
        <div>
          <h1 className="font-medium text-2xl text-white section-title">Explore Movies</h1>
        </div>
        <div className="flex gap-4">
          <select
            className="rounded-[40px] bg-[#173d77] text-white px-4 py-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            onChange={handleGenreChange}
            value={selectedGenre}
          >
            <option value="">Select Genre</option>
            {genresArray.map((ele: Genre) => (
              <option key={ele.id} value={ele.id} className="text-black">
                {ele.genre}
              </option>
            ))}
          </select>
          <select
            className="rounded-[40px] bg-[#173d77] text-white px-4 py-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value="">Sort By</option>
            <option value="asc" className="text-black">Ascending</option>
            <option value="desc" className="text-black">Descending</option>
          </select>
        </div>
      </div>
      <div>
        {infiniteMovies && infiniteMovies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {infiniteMovies.map((movie: Movie, index: number) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        ) : (
          !loading && <div className="text-white text-center py-12">No movies found.</div>
        )}
      </div>
      {loading && page > 1 && (
        <div className="flex justify-center mt-8">
          <SkeletonGrid count={5} />
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
