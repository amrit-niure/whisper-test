import Profile from '@/components/blocks/Profile'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { BiSolidVideo } from 'react-icons/bi'
import { BsInfoCircleFill } from 'react-icons/bs'
import React from 'react'
import ChatInput from '@/components/ChatInput'
import ChatDetailsBar from '@/components/ChatDetailsBar'

const page = () => {
  return (
    <div className='flex h-full'>
    <div className='px-8 flex flex-col gap-3 bg-light_bg h-full w-full md:w-3/4  border-r-2'>
      <div className='flex'>
        <Profile name={"Bibek Ghimire"} email={"bibekghimire@gmail.com"} image={"/avatar.jpg"} line={false} />
        <div className=' mt-8 ml-auto flex gap-6 items-center justify-center  text-primary'>
          <BsFillTelephoneFill className='text-2xl' />
          <BiSolidVideo className='text-3xl' />
          <BsInfoCircleFill className='text-2xl' />
        </div>
      </div>
      <div className=' h-[2px] bg-slate-300 bg-opacity-50'></div>
      {/* bottom part  */}
      <div className='h-full flex '>

        {/* chat input         */}
        <div className='mt-auto self-baseline w-full py-2'>
          <ChatInput />
        </div>
      </div>
    </div>
    <div className='hidden md:flex w-1/3'>
      <ChatDetailsBar />
    </div>
    </div> 
  )
}

export default page