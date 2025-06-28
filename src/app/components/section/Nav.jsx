
import React from 'react'
import SmNav from '../Nav/SmNav'
import LgNav from '../Nav/LgNav'

const Nav = () => {



    return (
        <nav className='px-10 max-sm:px-5 fixed w-screen z-5 h-[80px] backdrop-blur-sm bg-[#0000003f]'>
            <LgNav />
            <SmNav />
        </nav>



    )
}

export default Nav