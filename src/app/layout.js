import './globals.css'
import { Delius_Swash_Caps, Public_Sans } from 'next/font/google'
import Provider from './provider'
import Image from 'next/image'
const public_sans = Public_Sans({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700'] })
const delius = Delius_Swash_Caps({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'Socket IO Chat App',
  description: 'Amrit Niure Chat App - Wishper',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={public_sans.className}  >
        <Provider>
          <div className='flex flex-col gap-8 w-full h-full'>
            {/* <div className='self-end flex items-center cursor-pointer'>
              <Image
                height={100}
                width={100}
                src={'/logo.png'}
                alt='Whisper logo'
                className='self-end  md:h-[60px] md:w-[60px] h-[40px] w-[40px]'
              />
              <h1 className={`md:text-3xl text-biggest font-semiBold ${delius.className}`}>whisper</h1>
            </div> */}
            {children}
          </div>

        </Provider>
        </body>
    </html>
  )
}

