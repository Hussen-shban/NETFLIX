
import React from 'react'
import SmNav from '../Nav/SmNav'
import LgNav from '../Nav/LgNav'

const Nav = ({hidden}) => {



    return (
        <nav className='px-10 max-sm:px-5 fixed w-screen z-5 h-[80px] backdrop-blur-sm bg-[#0000003f]'>
            <LgNav hidden={hidden}/>
            <SmNav hidden={hidden} />
        </nav>



    )
}

export default Nav