import Sidebar from '../Sidebar';
import { toggleModal } from '@/state/modalSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const MobileSidebar = () => {
    const dispatch = useDispatch()
    const { isOpen } = useSelector((store) => store.modal)
    return (
        <div className='w-full'>
            {isOpen &&
                <div className='absolute left-0 top-0 z-50 h-[100vh] md:hidden w-1/2 border-r-2 '>
                    <div
                        onClick={() => dispatch(toggleModal())}
                        className=' absolute -right-16 top-0 cursor-pointer bg-primary text-light_bg px-2 1 py-1'
                    >
                        Close
                    </div>
                    <Sidebar />
                </div>}
        </div>

    )
}

export default MobileSidebar