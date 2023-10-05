'use client'
import { Sun } from '@/components/Icons';
import React from 'react'
import Sidebar from './Sidebar';
import { AlignRight } from 'lucide-react'
import { useState } from 'react';

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  today = today.toLocaleDateString("en-US", options);
  return (
    <div className='flex flex-col gap-3' >
      {showSidebar &&
        <div className='absolute left-0 top-0 z-50 h-[100vh]'>
          <div
            onClick={() => setShowSidebar(false)}
            className='absolute -right-14 top-10 cursor-pointer bg-primary text-light_bg px-2 py-1'
          >
            Close
          </div>
          <Sidebar />
        </div>}
      <div className='flex items-center justify-between'>
        <div className='flex gap-4'>
        <div className='flex items-center md:hidden gap-2' onClick={() => setShowSidebar(true)}>
          <AlignRight />
        </div>
        <div className='flex items-center gap-2'>
          <Sun className='text-xs'/>
          <h1 className='text md:text-big'>Good Morning,</h1>
        </div>
        </div>
        <div className='text-xs md:text-sm self-end'>
          {today}
        </div>
      </div>
      <div className='w-full h-[2px] bg-slate-300 bg-opacity-50'></div></div>
  )
}

export default Header