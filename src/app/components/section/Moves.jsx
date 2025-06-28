"use client"
import React, { useState } from 'react'
import Nav2 from '../Moves/Nav2'
import { useQuery } from '@tanstack/react-query'
import { fetchFromTMDB } from '@/app/react-query/fetchFromTMDB'
import Bestitem from '../best/Bestitem'
import Loading from '../loading.jsx/Loading'

const Moves = ({title,type}) => {

    const [Genre, setGenre] = useState(type=="movie"? 28 :10759)

    const { data, isLoading, isError } = useQuery({
        queryKey: [type, Genre],
        queryFn: () =>
            fetchFromTMDB(`discover/${type}`, {
                with_genres: Genre,
                sort_by: "popularity.desc",
            }),
    });

    console.log(data)
    if (isLoading || isError || !data) {
        return (
            <div className='bg-[#08100c] flexcenter h-screen '>
                <Loading text={"Loading"} />

            </div>
        )
    }

    return (
        <section id={type === "movie" ? "MOVIES":"TV SHOW"} className=' bg-[#08100c] min-h-screen paddingx pt-[100px]'>

            <h1 className='bg-title1 text-[52px] pb-5'>
              {title}
            </h1>
            <Nav2 setGenre={setGenre} type={type} />
            <div className='pt-10 flex items-center justify-around gap-5 flex-wrap'>
                {
                    data?.results.slice(0, 8).map((item) => {
                        return (

                            <div key={item.id} className=''>
                                <Bestitem id={item.id} type={type} />

                            </div>

                        )
                    })
                }
            </div>

        </section>
    )
}

export default Moves