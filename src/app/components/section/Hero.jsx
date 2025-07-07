

"use client"

import { fetchFromTMDB } from '@/app/react-query/fetchFromTMDB'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules'
import dynamic from 'next/dynamic'
const Trailer = dynamic(() => import('../trailer/Trailer'), { ssr: false })
const BlurText = dynamic(() => import('../bits/BlurText'), { ssr: false })
import useIsMobile from '../useIsMobile'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Loading from '../loading.jsx/Loading'

const Hero = () => {
  const [opentrailers, setopentrailers] = useState(false)
  const isMobile = useIsMobile();

  const [id, setid] = useState(null)
  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popular"],
    queryFn: () => fetchFromTMDB('trending/movie/week'),
  })
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  }

  const moviesToShow = data?.results.slice(0, 3) || [];







  const handleopentrailers = async (movieId) => {
    setid(movieId)
    setopentrailers(true);
  };






  if (isLoading || !data?.results) {
    return (
      <div className='h-screen flexcenter bg-[#08100c]'>

        <Loading text="Lading..." />

      </div>)
  }



  if (isError) {
    return (
      <div className='h-screen flexcenter bg-black'>

        <Loading text="Eroor" />

      </div>)
  }


  return (

    <section id='HOME' className=' relative  h-screen overflow-hidden  text-white '>
      <Swiper


        speed={800}
        pagination={true}
        keyboard={true}
        modules={[Navigation, Autoplay, Pagination, Mousewheel, Keyboard]}
        className="transparent-bg  "
      >
        {moviesToShow.map((movie,index) => {
          const rating = movie.vote_average / 2
          const fullStars = Math.floor(rating)
          const hasHalfStar = rating - fullStars >= 0.5

          const genre = movie.genre_ids.map(id => genreMap[id]).join(', ')


          const imageSize = isMobile ? 'w500' : 'w1280';

          return (
            <SwiperSlide className=" " key={movie.id}>
              <div className='h-screen   w-full '>
                <Image
                  fill
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/${imageSize}${movie.backdrop_path}`}     
                  placeholder="blur"
                  blurDataURL={`https://image.tmdb.org/t/p/w92${movie.backdrop_path}`}
                  className='object-cover'
                  priority={index === 0} 
                  unoptimized 
                />
                <div className='absolute w-full pb-10 top-0 left-0 h-screen transparent-bg  '>
                  <div className='pt-[100px] paddingx flex flex-col justify-center h-full '>




                    <div>
                      <BlurText
                        text={movie.title}
                        delay={250}
                        animateBy="words"
                        direction="top"
                        className=" bg-title sm:text-[72px] text-[42px]"
                      />
                    </div>





                    <div className='text-[12px] flex items-center gap-2 mt-2'>
                      <div className='flex items-center gap-1.5'>
                        {Array(fullStars).fill(0).map((_, i) => (
                          <img key={i} src="/svgs/star.svg" alt="star" width="16" height="16" />
                        ))}

                        {hasHalfStar && (
                          <img src="/svgs/star-half.svg" alt="half-star" width="16" height="16" />
                        )}
                      </div>
                      <p>{movie.vote_average.toFixed(1)}</p>
                      <p className='bg-gray-600 text-[10px] px-1 py-0.5 rounded'> {movie.adult ? "18+" : "14+"}</p>
                    </div>

                    <div className='max-w-[500px] text-[14px]'>
                      <BlurText
                        text={truncateText(movie.overview, 200)}
                        delay={50}
                        animateBy="words"
                        direction="top"
                        className=" text-[15px]"
                      />
                    </div>

                    <div className='py-5  text-[14px]'>
                      <p><span className='text-[#e50914]'>
                        Type:</span> {movie.media_type}</p>
                      <p><span className='text-[#e50914]'>Genres:</span> {genre}</p>
                      <p><span className='text-[#e50914]'>language:</span> {movie.original_language}</p>
                    </div>

                    <div className='flex items-center gap-5 text-[14px]'>
                      <button onClick={() => handleopentrailers(movie.id)} className=' cursor-pointer flex items-center gap-3 bg-red-600 text-white text-[12px] font-medium py-2 px-4 rounded'>
                        <img src="/svgs/play.svg" className='w-6 h-6' alt="play" />
                        <p>PLAY NOW</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        }

        )


        }
      </Swiper>

      {opentrailers &&


        <div className='h-screen  absolute top-[0px] left-0 w-screen overflow-hidden z-50 flex items-center justify-center '>

          <Trailer id={id} onClose={() => setopentrailers(false)} />
        </div>
      }
    </section>
  )
}

export default Hero
