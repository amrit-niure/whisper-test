"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/state/modalSlice';
import { ChevronLeft } from 'lucide-react';
import MobileSidebar from './MobileSidebar';

const Back = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((store) => store.modal)
  return (
    <div className=''>
      <div className='md:hidden mt-3 p-2 rounded-full hover:bg-white'
        onClick={() => dispatch(toggleModal())}>
        <ChevronLeft />
      </div>
        <MobileSidebar />
    </div>
  )
}

export default Back