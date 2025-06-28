import React from 'react'

const Plans = () => {
  return (
    <div id='Plans' className='pb-32 pt-32 text-white flex flex-col items-start gap-10 justify-start w-[90%] max-sm:w-full'>
      <h1 className='text-[32px] font-bold'>A Plan To Suit Your Needs</h1>

      <div className='flex  md:items-center  md:flex-row flex-col  justify-between gap-5 w-full'>

        <div className='transparent-bgplan1 p-[22px]  flex-1 basis-0 flex flex-col gap-2 text-[#bac2cd] rounded-2xl '>
          <p className='text-[22px] font-semibold text-white'>Standard with ads</p>
          <p className='text-[#bac2cd] text-[18px] font-semibold'>1080p</p>
          <div className='text-[14px] h-[80px] font-medium'>
            <p className='flex gap-5 items-center'>
              <img className='w-6 h-6' src="/svgs/chek.svg" alt="" />
              <span> Good video quality</span>

            </p>
            <p className='flex gap-5 items-center'>
              <img className='w-6 h-6' src="/svgs/chek.svg" alt="" />
              <span> Good video quality</span>

            </p>          </div>


          <p className='font-semibold'>$7.99 /mo</p>
        </div>

        <div className='transparent-bgplan2 p-[22px] flex-1 basis-0 flex flex-col gap-2  text-[#bac2cd] rounded-2xl '>
          <p className='text-[22px] font-semibold text-white'>Standard </p>
          <p className='text-[#bac2cd] text-[18px] font-semibold'>1080p</p>
          <div className='text-[14px] h-[80px] font-medium'>
            <p className='flex gap-5 items-center'>
              <img className='w-6 h-6' src="/svgs/chek.svg" alt="" />
              <span> Good video quality</span>

            </p>
            <p className='flex gap-5 items-center'>
              <img className='w-6 h-6' src="/svgs/chek.svg" alt="" />
              <span> Np ads</span>

            </p>
          </div>


          <p className='font-semibold'>$17.99 /mo</p>
        </div>


        <div className='transparent-bgplan3 p-[22px] flex-1 basis-0 flex flex-col gap-2  text-[#bac2cd] rounded-2xl '>
          <p className='text-[22px] font-semibold text-white'>Premuim</p>
          <p className='text-[#bac2cd] text-[18px] font-semibold'>4k HDR</p>
          <div className='text-[14px] font-medium h-[80px]'>
            <p className='flex gap-5 items-center'>
              <img className='w-6 h-6' src="/svgs/chek.svg" alt="" />
              <span> Best video quality</span>

            </p>
            <p className='flex gap-5 items-center'>
              <img className='w-6 h-6' src="/svgs/chek.svg" alt="" />
              <span> No ads</span>

            </p>

            <p className='flex gap-5 items-center'>
              <img className='w-6 h-6' src="/svgs/chek.svg" alt="" />
              <span> Immersive sound (spatial audio)</span>

            </p>


          </div>


          <p className='font-semibold'>$7.99 /mo</p>
        </div>

      </div>

    </div>
  )
}

export default Plans