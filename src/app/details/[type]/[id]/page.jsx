import Image from "next/image";
import Nav1 from "./Nav1";
import Video from "./Video";
import { fetchFromTMDB } from "../../../react-query/fetchFromTMDB";
import Swiper from "./Swip";
import Plans from "./Plans";
import Link from "next/link";
import { Suspense } from "react";
import Noise from "@/app/components/bits/Noise";

export default async function details({ params }) {

  const { type, id } = await params

  const data = await fetchFromTMDB(`${type}/${id}`)

  const title = data.title || data.name || 'No Title'
  const year = (data.release_date || data.first_air_date || '').slice(0, 4)
  const seasonsCount = data.number_of_seasons || null
  const rating = data.content_ratings?.results?.find(r => r.iso_3166_1 === 'US')?.rating || data.adult ? 'TV-MA' : 'PG'
  const genres = data.genres?.map(g => g.name).join(', ') || 'Unknown'
  const overview = data.overview || 'No overview available.'
  const creators = data.created_by?.map(c => c.name).join(', ') || 'Unknown'
  const starring = data.credits?.cast?.slice(0, 3).map(c => c.name).join(', ') || 'Unknown'

  return (
    <div className=" nn  min-h-screen paddingx">
      <div className="flex items-center  h-[60px] overflow-hidden">
        <Link
          href="/"
        >
          <Image src="/images/logo.png"
            width={200}
            height={150}
            alt="logo"
            className="w-[200px] max-sm:w-[100px]"
          />
        </Link>

      </div>
      <div className="  flex sticky top-0 pt-5 items-center w-full justify-center z-50">
        <Nav1 />
      </div>
      <div className="flex flex-col items-center justify-center mt-5">
        <div id="Trailers" className="w-full">
          <Suspense fallback={
            <Noise />
          }>
            <Video type={type} id={id} />

          </Suspense>

        </div>

        <div className=" max-sm:max-w-[100%]  inter p-5 rounded-2xl flex flex-col gap-3  mt-32 text-[16px] max-w-[90%] bg-[#ffffff23] text-white backdrop-blur-[16px]  "
        >
          <p className="text-[24px] font-normal">{title}</p>
          <div className="font-normal flex items-center gap-4">
            {year && <span>{year}</span>}
            {seasonsCount && (
              <>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span>{seasonsCount} Season{seasonsCount > 1 ? 's' : ''}</span>
              </>
            )}
            {rating && (
              <>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span>{rating}</span>
              </>
            )}
            {genres && (
              <>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span>{genres}</span>
              </>
            )}
          </div>
          <div className="flex max-sm:block h-full ">
            <p className="w-[55%] max-sm:w-full max-sm:border-r-0 max-sm:border-b-1 pb-1 border-r-1 max-sm:pr-0 pr-5 border-[#ffffff48]">{overview}</p>
            <p className=" max-sm:pl-0  pl-5">
              Starring: {starring}
              <br />
              Creators: {creators}
            </p>
          </div>

        </div>
        <div id='Episodes' className="w-full flex items-center  pt-32 justify-center max-sm:w-full" >
          <Swiper type={type} id={id} />
        </div>



        <Plans />

      </div>






    </div>
  )
}
