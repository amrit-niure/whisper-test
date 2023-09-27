'use client'
import React from 'react'
import { useSession } from "next-auth/react"

import { signOut } from 'next-auth/react'
import ChatApp from '@/components/ChatApp'
import Sidebar from '@/components/Sidebar'


const Dashboard = () => {

  const { data: session, status } = useSession()

    return (
      <div>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
   
      </div>

{/* chat */}
<div className='flex'>
  <Sidebar />
<ChatApp />
</div>
<button onClick={() => signOut()} className='border-2 px-4 py-2 border-pink-500 hover:bg-pink-500 hover:text-white '>Log Out</button>
      </div>
    )

}

export default Dashboard