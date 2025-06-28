"use client"
import { areanav } from '@/app/assets'
import Image from 'next/image'
import React from 'react'
import { Link } from 'react-scroll'

const LgNav = () => {

    const navlist = areanav.map((item) => {
        return (
            <Link
                key={item}
                to={item}
                smooth={true}
                duration={500}
                offset={-70}
            >
                <li className=' cursor-pointer'>
                    {item}
                </li>

            </Link>

        )
    })

    return (


        <div className='max-md:hidden flex items-center justify-between w-full'>
            <Image
                src="/images/logo.png"
                alt='logo.png'
                width={150}
                height={150}
                className=' cursor-pointer'
            />
            <ul className='flexcenter gap-7 text-white'>
                {
                    navlist
                }
            </ul>

            <div className='flexcenter gap-3 '>
                <img src="/svgs/search.svg" className='w-6  cursor-pointer' alt="search" />

            </div>





        </div>
    )
}

export default LgNav