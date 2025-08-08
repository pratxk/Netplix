import React from 'react';
import CircleProgress from '../Progress_Bars/CircularProgress';
import { genres } from '../Trending/genres';
import noImage from '@/public/assets/notAvailable.png'
import Link from 'next/link';
import { SearchCardProps } from '@/types/global';

const SearchCard: React.FC<SearchCardProps> = ({ item }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original';
  return (
    <div className="movie-card">
      <Link href={item.media_type === 'movie' ? `/movies/${item.id}` : item.media_type === 'tv' ? `/tvshows/${item.id}` : ``}>
        <div className="m-auto relative">
          <img
            src={
              item.poster_path || item.profile_path
                ? `${baseUrl}${item.poster_path || item.profile_path}`
                : (typeof noImage === 'string' ? noImage : noImage.src)
            }
            alt={item.name}
            className="w-full h-[300px] rounded-[3%] object-cover"
          />
          <div className="absolute bottom-[15px] bg-transparent right-[20px] flex gap-[5px]">
            {item.genre_ids?.slice(0, 2).map((ele) => {
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
            <CircleProgress value={item.vote_average || 0} />
          </div>
        </div>
      </Link>
      <div className="pl-1 mt-3 text-left">
        <p className="pt-5 font-bold text-base text-white">
          {item.original_title !== undefined ? item.original_title : item.original_name}
        </p>
        <p className="pb-5 font-bold text-sm text-white">
          {item.release_date !== undefined ? item.release_date : item.first_air_date}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;