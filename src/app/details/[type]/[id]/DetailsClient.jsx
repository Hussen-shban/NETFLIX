"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { fetchFromTMDB } from "@/app/react-query/fetchFromTMDB";
import Loading from "@/app/components/loading.jsx/Loading";
import Nav1 from "./Nav1";
import Plans from "./Plans";

// Dynamic imports مع ssr: false + fallback ثابت
const Video = dynamic(() => import("./Video"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[70vh] flex items-center justify-center text-white">
      Loading video...
    </div>
  ),
});
const SwiperComp = dynamic(() => import("./Swip"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[50vh] flex items-center justify-center text-white">
      Loading swiper...
    </div>
  ),
});

export default function DetailsClient({ type, id }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["details", type, id],
    queryFn: () => fetchFromTMDB(`${type}/${id}`),
    staleTime: 1000 * 60, // 1 دقيقة
  });

  if (isLoading)
    return <Loading text="Loading movie details..." />;
  if (isError || !data)
    return (
      <p className="text-white bg-black min-h-screen flex items-center justify-center">
        Error loading details
      </p>
    );

  const title = data.title || data.name || "No Title";
  const year = (data.release_date || data.first_air_date || "").slice(0, 4);
  const seasonsCount = data.number_of_seasons || null;
  const rating =
    data.content_ratings?.results?.find(r => r.iso_3166_1 === "US")?.rating ||
    (data.adult ? "TV-MA" : "PG");
  const genres = data.genres?.map(g => g.name).join(", ") || "Unknown";
  const overview = data.overview || "No overview available.";
  const creators = data.created_by?.map(c => c.name).join(", ") || "Unknown";
  const starring = data.credits?.cast?.slice(0, 3).map(c => c.name).join(", ") || "Unknown";

  return (
    <div className="nn min-h-screen paddingx text-white">
      {/* Logo */}
      <div className="flex items-center h-[60px] overflow-hidden">
        <a href="/">
          <img src="/images/logo.png" alt="logo" className="w-[200px] max-sm:w-[100px]" />
        </a>
      </div>

      {/* Navigation */}
      <div className="flex sticky top-0 pt-5 items-center w-full justify-center z-50">
        <Nav1 />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-5 w-full">
        {/* Trailers / Video */}
        <div id="Trailers" className="w-full">
          <Video type={type} id={id} />
        </div>

        {/* Movie Info */}
        <div className="max-sm:max-w-[100%] inter p-5 rounded-2xl flex flex-col gap-3 mt-32 text-[16px] max-w-[90%] bg-[#ffffff23] text-white backdrop-blur-[16px]">
          <p className="text-[24px] font-normal">{title}</p>
          <div className="font-normal flex items-center gap-4">
            {year && <span>{year}</span>}
            {seasonsCount && (
              <>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span>{seasonsCount} Season{seasonsCount > 1 ? "s" : ""}</span>
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

          <div className="flex max-sm:block h-full">
            <p className="w-[55%] max-sm:w-full max-sm:border-r-0 max-sm:border-b-1 pb-1 border-r-1 max-sm:pr-0 pr-5 border-[#ffffff48]">{overview}</p>
            <p className="max-sm:pl-0 pl-5">
              Starring: {starring}
              <br />
              Creators: {creators}
            </p>
          </div>
        </div>

        {/* Episodes / Swiper */}
        <div id="Episodes" className="w-full flex items-center pt-32 justify-center max-sm:w-full">
          <SwiperComp type={type} id={id} />
        </div>

        {/* Plans */}
        <Plans />
      </div>
    </div>
  );
}
