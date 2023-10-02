'use client'
import { signIn } from 'next-auth/react'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi'
import Image from 'next/image'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
  async function loginWithGoogle() {
    try {
      await signIn('google')
    } catch (error) {
      toast.error("Something went wrong while loggin in.")
    }
  }
  return (
    <div className='flex flex-col items-center md:gap-32 gap-16 border-2 h-[100vh] justify-center'>
      <div className='flex md:flex-row flex-col items-center justify-center  md:gap-20 gap-10 '>
        <Toaster />
        <Image
          src="/illustration.png"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-[250px] h-[300px] md:w-[400px] md:h-[400px]"
        />
        <div className='w-[100px] h-[1px] md:w-[2px] md:h-[100px] bg-primary bg-opacity-50'></div>
        <button onClick={loginWithGoogle} className='bg-light_bg px-4 py-2 hover:bg-primary hover:text-white flex items-center text-medium'>
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="github"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>

          Sign In with Google</button>

      </div>
      <div className='border-primary border-l-4 flex flex-col w-[90vw] max-w-[700px] bg-light_bg p-2'>
        <BiSolidQuoteLeft className='md:text-xl text-primary'/>
        <div className='px-4'>

        <h1 className='md:text-biggest  text-bigger font-semibold text-primary'>Early Internet Slang</h1>  
        <p className='text-secondary md:text-medium text-small'>
        The "@" symbol used in email addresses was chosen by computer engineer Ray Tomlinson for its scarcity in the English language, as it was unlikely to appear in names or text. It later became synonymous with email communication.
        </p>
        </div>
        <BiSolidQuoteRight  className='self-end md:text-xl  text-primary'/>
      </div>
    </div>
  )
}

export default Login