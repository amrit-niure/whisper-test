'use client'
import { signIn } from 'next-auth/react'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Login =  () => {
  async function loginWithGoogle() {
  try {
      await signIn('google')
  } catch (error) {
      toast.error("Something went wrong while loggin in.")
  }
}
  return (
    <div onClick={loginWithGoogle}>
      <Toaster />
     <button onClick={loginWithGoogle} className='border-2 border-pink-500 px-4 py-2 hover:bg-pink-500 hover:text-white'>Sign In with Google</button>
      </div>
  )
}

export default Login