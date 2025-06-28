import React from 'react'

const Footer = () => {
    return (
        
        <section className='bg-[#08100c] text-white pb-10 paddingx '>

            <div className='flex items-center flex-wrap gap-5 justify-between w-full'>
                <div className=''>
                    <p className='mb-5 text-[18px] font-medium'>Follow Us</p>
                    <div className='flex items-center gap-5'>
                        <img className='w-10 p-2 bg-black rounded-full' src="svgs/facebook.svg" alt="facebook" />
                        <img className='w-10 p-2 bg-black rounded-full' src="svgs/google.svg" alt="google" />
                        <img className='w-10 p-2 bg-black rounded-full' src="svgs/instagram.svg" alt="instagram" />


                    </div>
                </div>

                <div className=''>
                    <p className='mb-5 text-[18px] font-medium'>Netflix App</p>
                    <div className='flex flex-wrap items-center gap-5'>
                        <img className='' src="images/footer/01.jpg" alt="facebook" />
                        <img className='' src="images/footer/02.jpg" alt="google" />


                    </div>
                </div>
            </div>

        </section>
    )
}

export default Footer