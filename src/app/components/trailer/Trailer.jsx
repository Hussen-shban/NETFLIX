"use client";
import React from 'react';
import Noise from '../bits/Noise';
import { useQuery } from '@tanstack/react-query';
import { fetchFromTMDB } from '@/app/react-query/fetchFromTMDB';

const Trailer = ({ id, onClose }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchFromTMDB(`movie/${id}/videos`),
  });

 

  if (isError || !data) {
    return <p>...</p>;
  }

  const trailer = data?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  if (!trailer) {
    return <p>No trailer available</p>;
  }

  const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
  const videoId = trailer.key;

  const urlWithParams = `${trailerUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  return (
    <div className="relative flex items-center justify-center max-sm:w-[90%] w-[70%] h-[80%] max-sm:h-[50%]">
    {(!isLoading && trailer) ? (
      <iframe
        title="YouTube Trailer"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="w-[100%] h-[100%] p-0.5 rounded-2xl bg-[#ffffff31]"
        src={urlWithParams}
        loading="lazy"
      />
    ) : (
      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={2}
        patternAlpha={50}
      />
    )}
    <img
      onClick={onClose}
      src="/svgs/xmark.svg"
      className="w-[25px] rounded-4xl overflow-hidden cursor-pointer top-5 p-1 bg-red-600 right-5 max-sm:right-2 max-sm:top-2 absolute"
      alt="Close"
    />
  </div>
);
};

export default Trailer;
