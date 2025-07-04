"use client"
import { areanav } from '@/app/assets'
import { fetchFromTMDB } from '@/app/react-query/fetchFromTMDB'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';

const LgNav = () => {
    const router = useRouter()
    const navlist = areanav.map((item) => {



        return (

            <li key={item} className=' cursor-pointer'>

                <ScrollLink

                    to={item}
                    smooth={true}
                    duration={500}
                    offset={-70}
                >
                    {item}
                </ScrollLink>
            </li>



        )
    })
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

    return (


        <div className='max-md:hidden flex items-center justify-between w-full'>
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
            <ul className=' flexcenter gap-7 text-white'>
                {
                    navlist
                }
            </ul>

            <div className='flexcenter relative gap-3  '>
                <div className="search-container w-full ">
                    <div className="search-bar">
                        <input
                            value={search}
                            onChange={(e) => {
                                const value = e.target.value
                                setsearch(value)
                                fetchSuggestions(value)
                            }}
                            type="text" className="search-input" placeholder="Search..." />

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
                    <ul className="absolute top-[110%] left-0 w-full bg-white text-black rounded shadow-md z-10 max-h-60 overflow-auto">
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





        </div>
    )
}

export default LgNav