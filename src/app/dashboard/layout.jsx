import Sidebar from '@/components/Sidebar'
import React from 'react';
import { Sun } from '@/components/Icons';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


const layout = async ({ children }) => {
    const session = await getServerSession(authOptions)
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    today = today.toLocaleDateString("en-US", options);
    return (
        <div className='w-full flex items-center justify-center pb-4 rounded-xl '>
            <div className='flex w-[100vw] h-full '>
                <div className='hidden md:flex w-1/5'>
                    <Sidebar />
                </div>
                <div className='w-full md:w-4/5  h-auto bg-light_bg '>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout