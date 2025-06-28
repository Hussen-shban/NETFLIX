
import React from 'react'
import Bestitem from '../best/Bestitem'
import { moviearea, seriesarea } from '@/app/assets'

const Best = () => {

    return (
        <section id='BEST' className='min-h-screen text-white  paddingx pt-[100px] bg-[#08100c]'>
            <div >
                <h1 className='logo-effect text-2xl text-[#e50914] p-4'>Best TV Show </h1>
                <div className='pt-10 flex items-center justify-around gap-5 flex-wrap'>
                    {
                        seriesarea.map((id) => {
                            return (

                                <div key={id} className=''>
                                    <Bestitem id={id} type={"tv"} />

                                </div>

                            )
                        })
                    }
                </div>
            </div>

            <div className='mt-10 '>
                <h1 className='logo-effect text-2xl text-[#e50914] p-4'>Best TV Show </h1>
                <div className='pt-10 flex items-center justify-around gap-5 flex-wrap'>
                    {
                        moviearea.map((id) => {
                            return (

                                <div key={id} className='flex items-center '>
                                    <Bestitem id={id} type={"movie"} />
                                    </div>

                            

                            )
                        })
                    }
                </div>
            </div>

        </section>
    )
}

export default Best
// Best movies and series