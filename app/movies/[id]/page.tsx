import React from 'react';
import { FaPlay } from 'react-icons/fa';
import CircularProgress from '@/components/Progress_Bars/CircularProgress';
import { fetchMovieDetails } from '@/lib/api';
import { SingleMovie, Cast, Crew } from '@/types/global';

// Utility function to convert runtime
const convertRuntime = (time: number): string => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h : ${minutes}m`;
}

// Main Single Movie Page Component (App Router, server component)
async function SingleMoviePage({ params }: { params: { id: string } }) {
  const movieData = await fetchMovieDetails(params.id);
  console.dir(movieData,{depth: null})
  const baseURL = 'https://image.tmdb.org/t/p/original';

  if (!movieData) {
    return (
      <div className="text-center py-20 text-white">
        <p>Movie not found</p>
      </div>
    );
  }

  const singleMovie = movieData;
  const castData = movieData.credits;

  // Find the director and writers from the crew data
  const director = castData?.crew.find((person: Crew) => person.job === 'Director');
  const writers = castData?.crew.filter((person: Crew) => person.job === 'Writer');

  return (
    <div className="relative w-[99vw] bg-[#010d21]">
      {/* Backdrop Section */}
      <div
        className="absolute top-0 left-0 w-[99vw] h-screen z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${baseURL}${singleMovie?.backdrop_path})`,
          filter: 'brightness(0.7) contrast(0.9) blur(2px)'
        }}
      />
      <div className="max-w-7xl mx-auto py-8 z-[1] text-white px-4">
        {/* Movie Details Section */}
        <div className="flex flex-col md:flex-row bg-black/80 rounded-lg overflow-hidden h-auto md:h-[600px] gap-4 opacity-90 items-start p-4 shadow-2xl">
          <div className="h-[500px] flex-1">
            <img
              src={`${baseURL}${singleMovie?.poster_path}`}
              alt={singleMovie?.title}
              className="w-full h-full object-cover rounded-md shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <div className="flex flex-col items-start gap-5 flex-2 text-white max-h-full overflow-y-auto">
            <h1 className="text-4xl font-bold leading-tight">{singleMovie?.original_title}</h1>
            <p className="text-lg italic text-gray-400">{singleMovie?.tagline}</p>
            <div className="flex flex-wrap gap-3">
              {singleMovie?.genres.map((genre: { id: number; name: string }) => (
                <span 
                  key={genre.id} 
                  className="text-xs bg-pink-500 text-white px-3 py-1 rounded-md"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <CircularProgress value={singleMovie?.vote_average} />
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md shadow-lg transition-colors duration-200 flex items-center">
                <FaPlay className="mr-2" />
                Watch Trailer
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-base text-gray-300">{singleMovie?.overview}</p>
            </div>
            <div className="flex flex-wrap justify-between w-full">
              <div className="mb-2">
                <p className="text-xs font-bold text-gray-400">Status:</p>
                <p className="text-sm">{singleMovie?.status}</p>
              </div>
              <div className="mb-2">
                <p className="text-xs font-bold text-gray-400">Release Date:</p>
                <p className="text-sm">{singleMovie?.release_date}</p>
              </div>
              <div className="mb-2">
                <p className="text-xs font-bold text-gray-400">Runtime:</p>
                <p className="text-sm">{convertRuntime(singleMovie?.runtime)}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400">Director:</p>
              <p className="text-sm">{director ? director.name : 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400">Writer:</p>
              <p className="text-sm">
                {writers?.length > 0 ? writers.map((writer: Crew) => writer.name).join(', ') : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-40">
          <h2 className="text-2xl font-bold mb-4  text-white">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-4 ">
            {castData?.cast.map((cast: Cast) => (
              <div
                key={cast.id}
                className="flex flex-col items-center gap-3 bg-white/10 rounded-md p-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-110 hover:bg-white/20"
              >
                <img
                  src={cast.profile_path ? `${baseURL}${cast.profile_path}` : '/notAvailable.png'}
                  alt={cast.name}
                  className="rounded-full w-[120px] h-[120px] object-cover shadow-md"
                />
                <p className="text-base font-bold text-center">{cast.name}</p>
                <p className="text-xs text-gray-300">{cast.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMoviePage;
