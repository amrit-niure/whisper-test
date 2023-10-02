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

  let response;
  let incoming_request
  try {
    if (session && session.user) {  // Check if session.user is defined
      const apiUrl = `${process.env.NEXTAUTH_URL}/api/friend/${session.user.id}`;
      console.log("Logging API URL: ", apiUrl);
      
      response = await axios.get(apiUrl, {
        headers: {
          'Cookie': `${cookie.name}=${cookie.value}`
        }
      })
     } else {
        // Handle the case when session.user is undefined
        console.error('Error: session.user is undefined');
      }
    incoming_request = response.data.user.incoming_request
    console.log("Incoming Request request/page.jsx",incoming_request)
  } catch (error) {
    console.error('Error:', error);
  }
if(!incoming_request){
  return (<div>Loading...</div>)
}
  return (
    <div className='px-8 py-8 flex flex-col gap-3 bg-light_bg h-full'>
      {/* Good Morning Header */}
      <div className='flex items-baseline justify-between'>
        <div className='flex items-baseline gap-2'>
          <Sun />
          <h1 className='text-big'>Good Morning, <b></b></h1>
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
       <IncomingRequest incoming_request={incoming_request} />
      </div>
    </div>
  )
}

export default page