"use client"
import {SessionProvider} from 'next-auth/react'
import React from 'react'
const Provider = ({children}) => {
  return (
    <div>
        <SessionProvider>{children}</SessionProvider>
    </div>
  )
}

export default Provider
