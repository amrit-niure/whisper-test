import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({children}) => {
    return (
        <div className='flex flex-col gap-8 w-full h-full'>
            <div className='w-full min-h-[100vh] md:h-[100vh] '>
                <div className='flex w-100 min-h-screen'>
                    <div className='hidden md:flex w-1/5 '>
                        <Sidebar />
                    </div>
                    <div className='w-full md:w-4/5 h-screen px-2 md:px-4 flex flex-col gap-3 bg-light_bg border-l-2 '>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout


