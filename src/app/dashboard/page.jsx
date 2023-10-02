"use client"
import Image from 'next/image';
import React from 'react';
import { Sun } from '@/components/Icons';
import { useSession } from 'next-auth/react';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';
import AddFriend from '@/components/AddFriend';


const Dashboard =  () => {
  const {data,status} = useSession()
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  today = today.toLocaleDateString("en-US", options);
  return (

    <div className='px-8 py-8 flex flex-col  gap-3 bg-light_bg h-full '>
      {/* Good Morning Header */}
      <div className='flex items-center md:items-baseline justify-between'>
        <div className='flex items-center md:items-baseline gap-2'>
          <Sun />
          <h1 className='text-big'>Good Morning, <b>{data?.user.name.split(' ')[0]}</b></h1>
        </div>
        <div className='text-sm text-right'>
          {today}
        </div>
      </div>
      <div className='w-full h-[2px] bg-slate-300 bg-opacity-50'></div>
      {/* Add Create Quote Section */}
      <div className='flex items-center gap-8 flex-col md:flex-row'>
        {/* left side */}
        <div className='flex flex-col gap-4 w-full md:w-1/3'>
          <AddFriend />
          <div className='flex flex-col' >
            <h2 className="text-lg font-semibold mb-2">Create Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              className="p-2 border border-gray-300 mb-2 outline-none"
            />
            <button className="bg-primary hover:bg-secondary text-white w-fit  py-2 px-4">
              Create
            </button>
            {/* Add friend search and add functionality */}
          </div>
        </div>
        {/* divider */}
        <div className='w-[250px] h-[1px] md:w-[2px] md:h-[250px] bg-slate-300 bg-opacity-50'></div>

        {/* right side */}
        <div className='flex flex-col gap-4'>
          <div className="bg-primary text-white w-fit  py-2 px-4">
            Quote of the day
          </div>
          <div className='border-primary border-l-4 flex flex-col  max-w-[700px] bg-white p-2'>
            <BiSolidQuoteLeft className='md:text-lg text-primary' />
            <div className='px-4'>

              <h1 className='md:text-bigger  font-semibold text-primary'>- Winston Churchill</h1>
              <p className='text-secondary md:text-medium text-small'>
                Success is not final, failure is not fatal: It is the courage to
                continue that counts.
              </p>
            </div>
            <BiSolidQuoteRight className='self-end md:text-lg text-primary' />
          </div>
        </div>

      </div>
      <div className='flex flex-col' >
        <h2 className="text-lg font-semibold mb-2">Join Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          className="p-2 border border-gray-300 mb-2 outline-none w-1/3"
        />
        <button className="bg-primary hover:bg-secondary text-white w-fit  py-2 px-4">
          Join
        </button>
        {/* Add friend search and add functionality */}
      </div>

      {/* recent chats  */}
      <div className='pt-4'>
        <h2 className=" text-primary font-semibold">Recent Chats</h2>
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
              <h2 className='text-medium font-semibold '>Name</h2>
              <p className='text-small text-secondary'>Last message</p>
            </div>
          </div>

          <span className='ml-auto text-secondary flex items-center justify-center text-small'>2 mins ago</span>
        </div>
      </div>
    </div>

  )
}

export default Dashboard


