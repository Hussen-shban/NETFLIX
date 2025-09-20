"use client";

import Image from "next/image";
import Link from "next/link";
import Noise from "../bits/Noise";

const Bestitem = ({ item, type }) => {

  if (!item) return null;
  const title = item.title || item.name || "No Title";
  const imageUrl = item.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
    : null;

  return (
    <div className="relative">


      {imageUrl ? (
        <Link
          href={`/details/${type}/${item.id}`}
          prefetch={true}
        >
          <div className="w-[290px] sm:max-h-[164px] max-sm:w-[100%] overflow-hidden relative rounded-md">

            <Image
              src={imageUrl}
              placeholder={item.backdrop_path ? "blur" : "empty"}
              blurDataURL={
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w92${item.backdrop_path}`
                  : undefined
              }
              width={500}
              height={300}
              alt="images"
              className={`w-[290px] hover:scale-105 transition duration-300 max-sm:w-[100%] sm:max-h-[164px] rounded-md object-cover border border-red-700`}
            />
            <Image
              src="/svgs/video.svg"
              width={48}
              height={48}
              alt="icon"
              className="absolute bottom-0 left-0 w-12"
            />
          </div>
        </Link>
      ) : (
        <div className="w-[290px] h-[164px] max-sm:w-[90%] relative overflow-hidden rounded-md">
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>
      )}

      <div className="h-10">
        <div className="flexcenter gap-3 my-2 w-fit">
          <Image src="/svgs/star.svg" width={20} height={20} alt="star" />
          <p>{item.vote_average ? item.vote_average.toFixed(1) : "N/A"} / 10</p>
        </div>
        <p className="truncate w-[200px]">{title}</p>
      </div>
    </div>
  );
};

export default Bestitem;
