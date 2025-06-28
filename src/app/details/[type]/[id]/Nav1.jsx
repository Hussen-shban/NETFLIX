"use client"
import { Link } from "react-scroll"
import { areanav2 } from "../../../assets"


const Nav1 = () => {
    const list = areanav2.map((item) => {
        return (
            <Link
                key={item}
                to={item}
                smooth={true}
                duration={500}
                offset={-70}
            >
                <li className=" hover:text-white cursor-pointer transition font-semibold   " >
                    {item}
                </li>
            </Link>

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