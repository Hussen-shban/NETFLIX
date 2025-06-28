"use client"
import { areanav3, areanav4 } from '@/app/assets'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';

const Nav2 = ({ setGenre, type }) => {


    const genres = type === "movie" ? areanav3 : areanav4;
    const nav = genres.map((item) => {
        return (
            <SwiperSlide className='nav-effect  !flex  items-center justify-center text-[18px] w-fit p-3 px- cursor-pointer text-white' key={item.id}>
            
                <li onClick={() => setGenre(item.id)} className='w-fit  flex items-center justify-center'>
                    {item.type}
                </li>
            </SwiperSlide>
        )
    })
    return (
        <nav className='w-full md:w-[70%] m-auto'>


            <Swiper


                spaceBetween={30}
                grabCursor={true}
                breakpoints={{
                    320: {
                        slidesPerView: 2.5,
                    },
                    640: {
                        slidesPerView: 2.6,
                    },
                    768: {
                        slidesPerView: 3.6,
                    },
                    1024: {
                        slidesPerView: 5.6,
                    },
                }}

                className="mySwiper"
            >

                {nav}
            </Swiper>
        </nav>
    )
}

export default Nav2