"use client"
import { areanav } from '@/app/assets'
import { fetchFromTMDB } from '@/app/react-query/fetchFromTMDB'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
const SmNav = () => {

    const router = useRouter()
    const [search, setsearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [suggestions, setSuggestions] = useState([])


    async function handleSearch() {
        if (!search) return;
        setLoading(true)
        setError(false)
        try {
            const data = await fetchFromTMDB('search/multi', { query: search })

            const firstResult = data.results[0]
            if (!firstResult) {
                setError(true)
                return
            }

            const id = firstResult.id
            const type = firstResult.media_type

            router.push(`/details/${type}/${id}`)

        } catch (err) {
            setError(true)
            console.log(err)
        } finally {
            setLoading(false)
            setsearch("")

        }
    }

    async function fetchSuggestions(query) {
        if (!query) {
            setSuggestions([])
            return
        }

        try {
            const data = await fetchFromTMDB('search/multi', { query })
            setSuggestions(data.results.slice(0, 5))
        } catch (error) {
            console.log('Suggestion fetch error:', error)
        }
    }


    const [open, setopen] = useState(false)
    function handleopenlist() {
        setopen((e) => !e)
    }

    const list = areanav.map((item) => {
        return (
            <ul key={item}>

                <ScrollLink

                    to={item}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className='text-[22px] cursor-pointer font-semibold '
                    onClick={handleopenlist}
                >
                    {item}
                </ScrollLink>

            </ul>

        )
    })

    return (
        <div className='md:hidden   flex items-center justify-between w-full'>
            <Link
            href="/"
            >
                <Image
                    src="/images/logo.png"
                    alt='logo.png'
                    width={150}
                    height={150}
                    className=' cursor-pointer'
                />
            </Link>


            <div onClick={handleopenlist} className={`${open && "hidden"}`}>
                <img src="/images/menu.png" className='w-5  cursor-pointer' alt="heart" />

            </div>



            <div

                className={
                    `
                ${!open ? " translate-x-[100%]" : "translate-x-[0]"}
              max-sm:w-[80%] w-[70%] h-[100vh] absolute top-0 right-0 transparent-bg5 transition duration-400 px-3`
                } >



                <div className='w-full flex justify-end px-2 pt-3'>
                    <img onClick={handleopenlist} className='w-10 cursor-pointer' src="svgs/xmark.svg" alt="" />
                </div>


                <div className='flexcenter relative mt-5 gap-3 px-3 '>
                    <div className="search-container w-full">
                        <div className="search-bar">
                            <input
                                value={search}
                                onChange={(e) => {
                                    const value = e.target.value
                                    setsearch(value)
                                    fetchSuggestions(value)
                                }} type="text" className="search-input" placeholder="Search..." />

                            <div onClick={handleSearch} className="search-icon">
                                {!loading ? <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                                    ></path>
                                </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeDasharray="16" strokeDashoffset="16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" /><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
                                }
                            </div>
                        </div>
                        <div className="glow"></div>
                    </div>
                    {
                        error && <p className='text-red-600 text-[18px] absolute -bottom-8 left-1/2 -translate-x-1/2 '>No results found.</p>
                    }

                    {suggestions.length > 0 && (
                        <ul className="absolute top-[110%] left-1/2 -translate-x-1/2 w-[93%] bg-[#ffffff] text-black rounded shadow-md z-10 max-h-60 overflow-auto">
                            {suggestions.map((item) => (
                                <li
                                    key={item.id}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                        setSuggestions([])
                                        setsearch('')
                                        router.push(`/details/${item.media_type}/${item.id}`)
                                    }}
                                >
                                    {item.title || item.name}
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

                <ul className='text-white w-full flexcenter gap-5 flex-col pt-10 '>
                    {list}
                </ul>

            </div>









        </div>
    )
}

export default SmNav