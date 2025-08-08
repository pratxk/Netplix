import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { genres } from "./Trending/genres";
import CircleProgress from "./Progress_Bars/CircularProgress";
import noImage from '@/public/assets/notAvailable.png'
import Link from "next/link";
import { SliderProps } from '@/types/global';

const Slider: React.FC<SliderProps> = ({ type, url = '' }) => {
    const baseUrl = 'https://image.tmdb.org/t/p/original/';
    const swiperRef = useRef<any>(null);

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
        }
    };

    return (
        <div className="relative overflow-hidden">
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 4000 }}
                navigation={false} // Disable default navigation buttons
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    660: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    749: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1240: {
                        slidesPerView: 5,
                        spaceBetween: 12,
                    },
                }}
            >
                {type.map((i) => (
                    <SwiperSlide key={i.id}>
                        <Link href={url + i.id}>
                            <div className="m-auto relative">
                                <img
                                    src={i.poster_path ? `${baseUrl + i.poster_path}` : (typeof noImage === 'string' ? noImage : noImage.src)}
                                    alt={i.name}
                                    className="w-full h-[300px] rounded-[3%] transition-transform duration-300 ease-in-out hover:scale-105"
                                />
                                <div className="absolute bottom-[15px] bg-transparent right-[20px] flex gap-[5px]">
                                    {i.genre_ids.slice(0, 2).map((ele: number | string) => {
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
                                    <CircleProgress value={i.vote_average} />
                                </div>
                            </div>
                        </Link>
                        <div className="pl-1 mt-3 text-left">
                            <p className="pt-5 font-bold text-base text-white">
                                {i.original_title !== undefined ? i.original_title : i.original_name}
                            </p>
                            <p className="pb-5 font-bold text-sm text-white">
                                {i.release_date !== undefined ? i.release_date : i.first_air_date}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button
                className="absolute left-[-2px] top-[35%] transform -translate-y-1/2 z-10 border-none bg-transparent hover:bg-transparent active:bg-transparent shadow-xl"
                onClick={handlePrev}
            >
                <ChevronLeftIcon className="w-6 h-6 bg-transparent hover:bg-white border border-black text-3xl rounded-full" />
            </button>
            <button
                className="absolute right-[-2px] top-[35%] transform -translate-y-1/2 z-10 border-none bg-transparent hover:bg-transparent active:bg-transparent shadow-xl"
                onClick={handleNext}
            >
                <ChevronRightIcon className="w-6 h-6 bg-transparent hover:bg-white border border-black text-3xl rounded-full" />
            </button>
        </div>
    );
};

export default Slider;
