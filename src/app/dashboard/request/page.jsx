import { authOptions } from '@/lib/auth'

import { getServerSession } from 'next-auth'
import React from 'react'
import axios from 'axios'
import { cookies } from 'next/headers'
import IncomingRequest from '@/components/IncomingRequest';
import Header from '@/components/Header';


const page = async () => {
  try {
    const cookieStore = cookies();
    const cookie = cookieStore.get(process.env.COOKIE_NAME);
    
    const session = await getServerSession(authOptions);
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    today = today.toLocaleDateString("en-US", options);
  
    if (!session || !session.user ) {
      console.error('Error: User not authenticated');
      return <div>Error: User not authenticated</div>;
    }
    if (!cookie) {
      console.error('Error: No cookie found');
      return <div>Error: No cookie found.</div>;
    }

    const apiUrl = `${process.env.NEXTAUTH_URL}/api/friend/${session.user.id}`;
    console.log("Logging API URL: ", apiUrl);


  const response = await axios.get(apiUrl, {
    headers: {
      'Cookie': `${cookie.name}=${cookie.value}`
    }
  });


    const incoming_request = response.data.user.incoming_request;
    const group_invitation = response.data.user.group_invitation;
    console.log("Incoming Request request/page.jsx", incoming_request);

    if (!incoming_request) {
      return <div>Loading...</div>;
    }

    return (
      <div className='px-8 py-8 flex flex-col gap-3 bg-light_bg h-full'>
      {/* list box */}
      <div>
        <h1 className='text-big font-semibold'>Incoming Friend Requests</h1>
      </div>

      <div>
       <IncomingRequest incoming_request={incoming_request} />
      </div>
      <div>
        <h1 className='text-big font-semibold'>Incoming Group Requests</h1>
      </div>

      <div>
       <IncomingRequest group_invitation={group_invitation} userId={session.user.id}/>
      </div>
    </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return <div>Error: {error.message}</div>;
  }
};

export default page;
