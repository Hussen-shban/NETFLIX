"use client"
import Noise from '@/app/components/bits/Noise'
import { fetchFromTMDB } from '@/app/react-query/fetchFromTMDB'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Video = ({ type, id }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [type, id],
        queryFn: () => fetchFromTMDB(`${type}/${id}/videos`),
    });

    if (isLoading) return
    <div className="relative w-full h-[70vh] overflow-hidden  bgvideo rounded-[20px] ">
        <Noise />
    </div >;
    if (isError) {
        console.error("Trailer fetching error:", error); // ✅ هون رح تشوف الخطأ بالتفصيل
        return <div>Failed to load trailer</div>;
    } if (!data || !data.results) return
    <div className="relative w-full h-[70vh] overflow-hidden  bgvideo rounded-[20px] ">
        <Noise />
    </div >;

    const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    if (!trailer) return <div className="text-white">No trailer available</div>;

    const trailerUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}`;

    console.log(isError)
    return (
        <div className="relative w-full h-[70vh] max-sm:h-[50vh] overflow-hidden  bgvideo rounded-[20px] "

        >

            {trailer ? (
                <iframe
                    className="w-full h-full object-fill "
                    src={trailerUrl}
                    title="Trailer"
                    allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <div className="text-white p-4">No trailer available</div>
            )}


        </div >

    )
}

export default Video