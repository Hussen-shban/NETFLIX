"use client"
import { areanav } from '@/app/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { Link } from 'react-scroll'

const SmNav = () => {

    const [open, setopen] = useState(false)
    function handleopenlist() {
        setopen((e) => !e)
    }

    const list = areanav.map((item) => {
        return (
            <Link
                key={item}
                to={item}
                smooth={true}
                duration={500}
                offset={-70}
                className='text-[22px] cursor-pointer font-semibold '
                onClick={handleopenlist}
            >
                {item}
            </Link>
        )
    })

    return (
        <div className='md:hidden   flex items-center justify-between w-full'>

            <Image
                src="/images/logo.png"
                alt='logo.png'
                width={150}
                height={150}
                className=' cursor-pointer'
            />

            <div onClick={handleopenlist} className={`${open && "hidden"}`}>
                <img src="/images/menu.png" className='w-5  cursor-pointer' alt="heart" />

            </div>

            <div

                className={
                    `
                ${!open ? " translate-x-[100%]" : "translate-x-[0]"}
              max-sm:w-[80%] w-[70%] h-[100vh] absolute top-0 right-0 transparent-bg5 transition duration-400`
                } >

                <div className='w-full flex justify-end px-2 pt-3'>
                    <img onClick={handleopenlist} className='w-10 cursor-pointer' src="svgs/xmark.svg" alt="" />
                </div>

                <ul className='text-white w-full flexcenter gap-5 flex-col pt-10 '>
                    {list}
                </ul>

            </div>









        </div>
    )
}

export default SmNav