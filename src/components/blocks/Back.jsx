"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/state/modalSlice';
import { ChevronLeft } from 'lucide-react';
import Sidebar from '../Sidebar';

const Back = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((store) => store.modal)
  return (
    <div className='relative'>
      <div className='md:hidden mt-3 p-2 rounded-full hover:bg-white'
        onClick={() => dispatch(toggleModal())}>
        <ChevronLeft />
      </div>

    { isOpen && <div className=' absoulte top-0 left-0 h-screen '>
        <Sidebar />
      </div>}

    </div>
  )
}

export default Back