import Image from 'next/image'
import React from 'react'

const SmNav = () => {

    return (
        <div className='md:hidden flex items-center justify-between w-full'>

            <div className=' '>
                <img src="/images/menu.png" className='w-5  cursor-pointer' alt="heart" />

            </div>

            <Image
                src="/images/logo.png"
                alt='logo.png'
                width={150}
                height={150}
                className=' cursor-pointer'
            />







        </div>
    )
}

export default SmNav