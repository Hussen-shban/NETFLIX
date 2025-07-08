import Image from "next/image";
import Link from "next/link";
import Noise from "../bits/Noise";

const Bestitem = ({ item, type }) => {
    if (!item) return null;  // حماية إذا ما كان في عنصر
    const title = item.title || item.name || "No Title";
    const imageUrl = item.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
      : null;
  
    return (
      <div>
        {imageUrl ? (
          <Link href={`details/${type}/${item.id}`} className=''>
            <div className='w-[290px] sm:max-h-[164px] max-sm:w-[100%]  overflow-hidden relative rounded-md  '>
              <Image
                src={imageUrl}
                placeholder="blur"
                blurDataURL={`https://image.tmdb.org/t/p/w92${item.backdrop_path}`}
                width={500}
                height={500}
                unoptimized
                alt='images'
                className='w-[290px]  hover:scale-105 transition duration-300  max-sm:w-[100%]  sm:max-h-[164px] rounded-md  object-cover border-[1px] border-red-700'
              />
              <img className=' absolute bottom-0 left-0 w-12 ' src="svgs/video.svg" alt="icon" />
            </div>
          </Link>
        ) : (
          <div className='w-[290px] h-[164px] max-sm:w-[90%] relative overflow-hidden rounded-md '>
            <Noise
              patternSize={250}
              patternScaleX={1}
              patternScaleY={1}
              patternRefreshInterval={2}
              patternAlpha={15}
            />
          </div>
        )}
  
        <div className='h-10'>
          <div className='flexcenter gap-3 my-2 w-fit'>
            <img className='w-5' src="svgs/star.svg" alt="star" />
            <p>{item.vote_average ? item.vote_average.toFixed(1) : 'N/A'} / 10</p>
          </div>
          <p className='truncate w-[200px]'>{title}</p>
        </div>
      </div>
    );
  }
  export default Bestitem;