"use client"
import React from 'react'
import Bestitem from '../best/Bestitem'
import { moviearea, seriesarea } from '@/app/assets'
import { useQuery } from '@tanstack/react-query'
import { fetchFromTMDB } from '@/app/react-query/fetchFromTMDB'
import Loading from '../loading.jsx/Loading'

const fetchMultipleItems = async (type, ids) => {
  const promises = ids.map(id => fetchFromTMDB(`${type}/${id}`))
  return Promise.all(promises)
}

const Best = () => {
  const {
    data: seriesData,
    isLoading: loadingSeries,
    isError: errorSeries,
  } = useQuery({
    queryKey: ['bestSeries'],
    queryFn: () => fetchMultipleItems('tv', seriesarea),
  })

  const {
    data: movieData,
    isLoading: loadingMovies,
    isError: errorMovies,
  } = useQuery({
    queryKey: ['bestMovies'],
    queryFn: () => fetchMultipleItems('movie', moviearea),
  })

  if (loadingSeries || loadingMovies) {
    return (
      <div className="bg-[#08100c] flexcenter h-screen">
        <Loading text="Loading Best Content..." />
      </div>
    )
  }

  if (errorSeries || errorMovies) {
    return <div className="text-red-500 text-center">Failed to load best content.</div>
  }

  return (
    <section id='BEST' className='min-h-screen text-white paddingx pt-[100px] bg-[#08100c]'>

      <div>
        <h1 className='logo-effect text-2xl text-[#e50914] p-4'>Best TV Shows</h1>
        <div className='pt-10 flex items-center justify-around gap-5 flex-wrap'>
          {seriesData.map(item => (
            <div key={item.id}>
              <Bestitem item={item} type="tv" />
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10'>
        <h1 className='logo-effect text-2xl text-[#e50914] p-4'>Best Movies</h1>
        <div className='pt-10 flex items-center justify-around gap-5 flex-wrap'>
          {movieData.map(item => (
            <div key={item.id}>
              <Bestitem item={item} type="movie" />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default Best
