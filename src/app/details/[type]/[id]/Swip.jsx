"use client"
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import "swiper/css/navigation";
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/app/react-query/fetchFromTMDB';
import Noise from '@/app/components/bits/Noise';

export default function Swip({ type, id }) {



  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["videos", type, id],
    queryFn: () => fetchFromTMDB(`${type}/${id}/videos`),
  });

  if (isLoading) return (
    <div className='w-full bg-black p-4 mb-10  relative rounded-2xl'>



    <Swiper


      modules={[FreeMode, Pagination, Navigation]}
      className="mySwiper"

      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}

    >
      {Array(3).fill().map((__,i) => (
            <SwiperSlide key={i}>
          <div className='w-[300px] h-[200px] max-sm:w-full  overflow-hidden rounded-lg shadow'>
            <Noise />
          </div>
        </SwiperSlide>
      ))}






    </Swiper>
  </div>
  );

  if (isError) {
    console.error("Trailer fetching error:", error);
    return <div className="text-red-500">Failed to load trailer</div>;
  }

  if (!data || !data.results) return (
      <div className='w-full bg-black p-4 mb-10  relative rounded-2xl'>



        <Swiper


          modules={[FreeMode, Pagination, Navigation]}
          className="mySwiper"

          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}

        >
      {Array(3).fill().map((__,i) => (
            <SwiperSlide key={i}>
              <div className='w-[300px] h-[200px] max-sm:w-full  overflow-hidden rounded-lg shadow'>
                <Noise />
              </div>
            </SwiperSlide>
          ))}






        </Swiper>
      </div>

  );


  return (
    <div className='w-[90%] max-sm:w-full bg-black p-4   relative rounded-2xl'>



      <Swiper


        observer={true}
        observeParents={true}
        modules={[FreeMode, Navigation ,Navigation]}
        className="mySwiper"

        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}

      >
        {data.results.map((video) => (
          <SwiperSlide key={video.id}>
            <div className='w-[100%] h-[200px] max-sm:w-full bg-white overflow-hidden rounded-lg shadow'>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allowFullScreen
              />
            </div>
          </SwiperSlide>
        ))}







      </Swiper>
    </div>
  );
}
