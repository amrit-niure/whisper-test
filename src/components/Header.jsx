'use client'
import { Sun } from '@/components/Icons';
import React from 'react'
import Sidebar from './Sidebar';
import { AlignRight } from 'lucide-react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {toggleModal} from '@/state/modalSlice'
const Header = ({ line = true }) => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((store) => store.modal)
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  today = today.toLocaleDateString("en-US", options);
  return (
    <div className='flex flex-col  md:gap-1 gap-2 py-4 ' >
      {isOpen &&
        <div className='absolute left-0 top-0 z-50 h-[100vh] md:hidden '>
          <div
            onClick={() => dispatch(toggleModal())}
            className=' absolute -right-14 top-10 cursor-pointer bg-primary text-light_bg px-2 py-1'
          >
            Close
          </div>
          <Sidebar />
        </div>}
      <div className='flex items-center justify-between '>
        <div className='flex gap-4'>
          <div className='flex items-center md:hidden gap-2' onClick={() =>  dispatch(toggleModal())}>
            <AlignRight />
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 md:w-14 md:h-14 '>
              <Sun />
            </div>
            <h1 className='text md:text-big'>Good Morning,</h1>
          </div>
        </div>
        <div className='text-xs md:text-sm self-end'>
          {today}
        </div>
      </div>
      {line &&
        <div className='w-full h-[2px] bg-slate-300 bg-opacity-50'></div>}
    </div>
  )
}

export default Header