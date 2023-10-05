import Sidebar from '@/components/Sidebar'
import React from 'react';
import { Sun } from '@/components/Icons';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';


const layout = async ({ children }) => {
    const session = await getServerSession(authOptions)
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    today = today.toLocaleDateString("en-US", options);
    return (
        <div className='w-full   min-h-[100vh] md:h-[100vh] '>
            <div className='flex w-100 min-h-screen'>
                <div className='hidden md:flex w-1/5 '>
                    <Sidebar />
                </div>
                <div className='w-full md:w-4/5   px-8 py-4 flex flex-col gap-3 bg-light_bg '>
                    <Header />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout