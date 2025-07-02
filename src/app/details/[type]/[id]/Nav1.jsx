"use client"
import { Link } from "react-scroll"
import { areanav2 } from "../../../assets"


const Nav1 = () => {
    const list = areanav2.map((item) => {
        return (

            <li    key={item} className=" hover:text-white cursor-pointer transition font-semibold   " >

                <Link
                 
                    to={item}
                    smooth={true}
                    duration={500}
                    offset={-70}
                >
                    {item}

                </Link>
            </li>


        )
    })

    return (

        <nav
            style={{ boxShadow: '0 4px 26px rgba(0, 0, 0, 0.4)' }}
            className="w-[300px] h-[50px] rounded-full bg-black    ">


            <ul className="text-gray-400 h-full flex items-center justify-around">
                {list}
            </ul>

        </nav>
    )
}

export default Nav1