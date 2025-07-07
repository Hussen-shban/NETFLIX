"use client"
import React, { useEffect, useRef, useState } from 'react'
import Nav2 from '../components/Nav/Nav2'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchFromTMDB } from '@/app/react-query/fetchFromTMDB'
import Bestitem from '../components/best/Bestitem'
import Loading from '../components/loading.jsx/Loading'
import Nav from '../components/section/Nav'
import { userAgent } from 'next/server'

const Moves = () => {

  const type = "movie"
  const [Genre, setGenre] = useState(type == "movie" ? 28 : 10759)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", Genre],
    queryFn: ({ pageParam = 1 }) =>
      fetchFromTMDB(`discover/${type}`, {
        with_genres: Genre,
        sort_by: "popularity.desc",
        page: pageParam,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });


  const bottomRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);



  console.log(data)
  if (isLoading || isError || !data) {
    return (
      <div className='bg-[#08100c] flexcenter h-screen '>
        <Loading text={"Loading"} />

      </div>
    )
  }

  return (
    <>
      <Nav hidden={true} />
      <section className=' bg-[#08100c] min-h-screen paddingx pt-[100px] '>

        <h1 className='bg-title1 text-[52px] pb-5'>
          Movies
        </h1>
        <Nav2 setGenre={setGenre} type={type} />
        <div className='pt-10 flex items-center justify-around gap-5 flex-wrap'>
          {data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.results.slice(0, 10).map((item) => (
                <div key={item.id} className="text-white">
                  <Bestitem id={item.id} type={type} />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div ref={bottomRef} className="h-10 w-full" />

      </section>


    </>

  )
}

export default Moves