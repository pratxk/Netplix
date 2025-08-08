import React from "react";
import { FaPlay } from "react-icons/fa";
import CircularProgress from "@/components/Progress_Bars/CircularProgress";
import { fetchTvShowDetails } from "@/lib/api";
import { SingleTvShow, Cast, Crew } from "@/types/global";

interface SingleTvShowPageProps {
  params: {
    id: string;
  };
}

// Main Single TV Show Page Component
const SingleTvShowPage: React.FC<SingleTvShowPageProps> = async ({
  params,
}) => {
  const tvShowData = await fetchTvShowDetails(params.id);
  const baseURL = "https://image.tmdb.org/t/p/original";

  if (!tvShowData) {
    return (
      <div className="text-center py-20 text-white">
        <p>TV Show not found</p>
      </div>
    );
  }

  const seriesData = tvShowData;
  const castData = tvShowData?.credits;

  return (
    <div className="relative w-[99vw] bg-[#010d21]">
      {/* Backdrop Section */}
      <div
        className="absolute top-0 left-0 w-[99vw] h-screen z-0 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${baseURL}${seriesData.backdrop_path})`,
          filter: "brightness(0.8)",
        }}
      />

      <div className="max-w-7xl mx-auto py-8 z-[1] text-white px-4">
        {/* Series Details Section */}
        <div className="flex flex-col md:flex-row bg-black/80 rounded-lg overflow-hidden h-auto md:h-[600px] gap-4 opacity-90 items-start p-4 shadow-2xl">
          <div className="h-[500px] flex-1">
            <img
              src={`${baseURL}${seriesData.poster_path}`}
              alt={seriesData.name}
              className="w-full h-full object-cover rounded-md shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <div className="flex flex-col items-start gap-5 flex-2 text-white max-h-full overflow-y-auto">
            <h1 className="text-4xl font-bold leading-tight">
              {seriesData.original_name}
            </h1>
            <p className="text-lg italic text-gray-400">
              {seriesData.tagline || "No tagline available."}
            </p>
            <div className="flex flex-wrap gap-3">
              {seriesData.genres.map((genre: { id: number; name: string }) => (
                <span
                  key={genre.id}
                  className="text-xs bg-pink-500 text-white px-3 py-1 rounded-md"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <CircularProgress value={seriesData.vote_average} />
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md shadow-lg transition-colors duration-200 flex items-center">
                <FaPlay className="mr-2" />
                Watch Trailer
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-base text-gray-300">{seriesData.overview}</p>
            </div>
            <div className="flex flex-wrap justify-between w-full">
              <div className="mb-2">
                <p className="text-xs font-bold text-gray-400">Status:</p>
                <p className="text-sm">{seriesData.status}</p>
              </div>
              <div className="mb-2">
                <p className="text-xs font-bold text-gray-400">
                  First Air Date:
                </p>
                <p className="text-sm">{seriesData.first_air_date}</p>
              </div>
              <div className="mb-2">
                <p className="text-xs font-bold text-gray-400">
                  Number of Seasons:
                </p>
                <p className="text-sm">{seriesData.number_of_seasons}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400">Creator:</p>
              <p className="text-sm">
                {seriesData.created_by.length > 0
                  ? seriesData.created_by
                      .map(
                        (creator: { id: number; name: string }) => creator.name
                      )
                      .join(", ")
                  : "Unknown"}
              </p>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-40">
          <h2 className="text-2xl font-bold mb-4 text-white">Cast</h2>
          {castData.cast.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-4">
              {castData.cast.map((cast: Cast) => (
                <div
                  key={cast.id}
                  className="flex flex-col items-center gap-3 bg-white/10 rounded-md p-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-110 hover:bg-white/20"
                >
                  <img
                    src={
                      cast.profile_path
                        ? `${baseURL}${cast.profile_path}`
                        : "/notAvailable.png"
                    }
                    alt={cast.name}
                    className="rounded-full w-[120px] h-[120px] object-cover shadow-md"
                  />
                  <p className="text-base font-bold text-center">{cast.name}</p>
                  <p className="text-xs text-gray-300">{cast.character}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No cast information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleTvShowPage;
