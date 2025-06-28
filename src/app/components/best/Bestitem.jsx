"use client"
import { fetchFromTMDB } from '@/app/react-query/fetchFromTMDB'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Noise from '../bits/Noise'

const Bestitem = ({ id, type }) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: [type, id],
        queryFn: () => fetchFromTMDB(`${type}/${id}`),
    })


    return (
        <div>


            {isLoading || isError || !data ?


                <div className='w-[290px] h-[164px] max-sm:w-[90%] relative overflow-hidden rounded-md '>
                    <Noise
                        patternSize={250}
                        patternScaleX={1}
                        patternScaleY={1}
                        patternRefreshInterval={2}
                        patternAlpha={15}
                    />
                </div>

                :





                <Link href={`details/${type}/${id}`} className=''>
                    <div className='w-[290px] sm:max-h-[164px] max-sm:w-[100%]  overflow-hidden relative rounded-md  '>
                        <Image
                            src={`https://image.tmdb.org/t/p/w780${data.backdrop_path}`}
                            placeholder="blur"
                            blurDataURL={`https://image.tmdb.org/t/p/w92${data.backdrop_path}`}
                            width={500}
                            height={500}
                            unoptimized 
                            alt='images'
                            className='w-[290px]  hover:scale-105 transition duration-300  max-sm:w-[100%]  sm:max-h-[164px] rounded-md  object-cover border-[1px] border-red-700'
                        />


                        
                        <img className=' absolute bottom-0 left-0 w-12 ' src="svgs/video.svg" alt="l" />
                    </div>
                </Link>
            }

            <div className='flexcenter gap-3 my-2 w-fit'>
                <img className='w-5' src="svgs/star.svg" alt="" />
                <p>{data?.vote_average ? data.vote_average.toFixed(1) : 'N/A'} / 10</p>

            </div>
            <p>{data?.name ? data.name : data?.title ? data.title : "..."}</p>
        </div>
    )
}

export default Bestitem