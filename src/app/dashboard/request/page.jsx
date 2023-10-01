import { authOptions } from '@/lib/auth'
import { Check, X } from 'lucide-react'
import { Sun } from '@/components/Icons';
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const page = async () => {
  const session = await getServerSession(authOptions)
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  today = today.toLocaleDateString("en-US", options);
  return (
    <div className='px-8 py-8 flex flex-col gap-3 bg-light_bg h-full'>
      {/* Good Morning Header */}
      <div className='flex items-baseline justify-between'>
        <div className='flex items-baseline gap-2'>
          <Sun />
          <h1 className='text-big'>Good Morning, <b>{session.user.name.split(' ')[0]}</b></h1>
        </div>
        <div className='text-sm'>
          {today}
        </div>
      </div>
      <div className='w-full h-[2px] bg-slate-300 bg-opacity-50'></div>
      <div className='flex gap-4 py-4 bg-light_bg_chat px-4 cursor-pointer'>
        <div className='flex gap-2 items-center'>
          <Image
            src='/avatar.jpg'
            alt="User Photo"
            width={50}
            height={50}
            className='rounded-full'
          />
          <div>
            <h2 className='text-medium font-semibold'>Rohit Sharma</h2>
            <p className='text-small text-secondary'>rohitsharma@gmail.com</p>
          </div>
        </div>

        {/*  */}
        <div className='ml-auto flex gap-8 items-center'>
          <div className='flex gap-8'>
            <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 ' >
              <Check size={20} />
              Accept
            </div>
            <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '>
              <X size={20} />
              Decline
            </div>
          </div>

          <span className=' text-secondary flex items-center justify-center text-small w-full'>2 days ago</span>

        </div>

      </div>
    </div>
  )
}

export default page