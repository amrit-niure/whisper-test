import './globals.css'
import { Delius_Swash_Caps, Public_Sans } from 'next/font/google'
const public_sans = Public_Sans({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700'] })
const delius = Delius_Swash_Caps({ subsets: ['latin'], weight: ['400'] })

import Provider from './provider'
import Sidebar from '@/components/Sidebar'
import React from 'react';
import { Sun } from '@/components/Icons';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';

export const metadata = {
  title: 'Whisper',
  description: 'Real time chat app wishper',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  today = today.toLocaleDateString("en-US", options);
  return (
    <html lang="en" >
      <body className={public_sans.className}  >
        <Provider>
          <div className='flex flex-col gap-8 w-full h-full'>
            <div className='w-full min-h-[100vh] md:h-[100vh] '>
              <div className='flex w-100 min-h-screen'>
                <div className='hidden md:flex w-1/5 '>
                  <Sidebar />
                </div>
                <div className='w-full md:w-4/5 h-screen px-2 md:px-4 flex flex-col gap-3 bg-light_bg'>
                  {children}
                </div>
              </div>
            </div>
          </div>

        </Provider>
      </body>
    </html>
  )
}

