
import { authOptions } from '@/lib/auth'
import { Sun } from '@/components/Icons';
import { getServerSession } from 'next-auth'
import React from 'react'
import axios from 'axios'
import { cookies } from 'next/headers'
import IncomingRequest from '@/components/IncomingRequest';

const page = async () => {
  const cookieStore = cookies()
  const cookie = cookieStore.get('next-auth.session-token')
  const session = await getServerSession(authOptions)
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  today = today.toLocaleDateString("en-US", options);

  // Get list of friend request

    const apiUrl = `${process.env.NEXTAUTH_URL}/api/friend/6513772c2c1a1bbc4669e656`;
   const response = await axios.get(apiUrl, {
      headers: {
        'Cookie': `${cookie.name}=${cookie.value}`
      }
    });
    const incoming_req = response.data.user.incoming_request
    console.log("Incoming Request request/page.jsx",incoming_req)


  return (
    <div className='px-8 py-8 flex flex-col gap-3 bg-light_bg h-full'>
      {/* Good Morning Header */}
      <div className='flex items-baseline justify-between'>
        <div className='flex items-baseline gap-2'>
          <Sun />
          <h1 className='text-big'>Good Morning, <b>{session?.user.name.split(' ')[0]}</b></h1>
        </div>
        <div className='text-sm'>
          {today}
        </div>
      </div>
      <div className='w-full h-[2px] bg-slate-300 bg-opacity-50'></div>
      {/* list box */}
      <div>
        <h1 className='text-big font-semibold'>Incoming Requests</h1>
      </div>

      <div>
        <IncomingRequest incoming_request={incoming_req} />
      </div>
    </div>
  )
}

export default page