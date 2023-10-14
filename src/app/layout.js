import './globals.css'
import { Delius_Swash_Caps, Public_Sans } from 'next/font/google'
const public_sans = Public_Sans({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700'] })
const delius = Delius_Swash_Caps({ subsets: ['latin'], weight: ['400'] })

import Sidebar from '@/components/Sidebar'
import React from 'react';
import Providers from './providers'

export const metadata = {
  title: 'Whisper',
  description: 'Real time chat app wishper',
}

export default async function RootLayout({ children }) {
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  today = today.toLocaleDateString("en-US", options);

  return (
    <html lang="en" >
      <body className={public_sans.className}  >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
