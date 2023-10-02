import Profile from '@/components/blocks/Profile'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { BiSolidVideo } from 'react-icons/bi'
import { BsInfoCircleFill } from 'react-icons/bs'
import React from 'react'
import ChatInput from '@/components/ChatInput'
import ChatDetailsBar from '@/components/ChatDetailsBar'
import { notFound } from "next/navigation";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import axios from 'axios'
import { cookies } from 'next/headers'
import Message from '@/components/Message'

const page = async ({ params }) => {
  const { chatId } = params
  const cookieStore = cookies()
  const cookie = cookieStore.get(process.env.COOKIE_NAME)
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const { user } = session;
  const [userId1, userId2] = chatId.split("--");

  if (user.id !== userId1 && user.id !== userId2) {
    return notFound();
  }

  const chatPartnerId = user.id == userId1 ? userId2 : userId1;

  // // fetch data of the chat partner
  // let response;
  // let chatPartner;
  // try {
  //   const apiUrl = `http://localhost:3000/api/friend/${chatPartnerId}`;
  //   response = await axios.get(apiUrl, {
  //     headers: {
  //       'Cookie': `${cookie.name}=${cookie.value}`
  //     }
  //   });
  //   chatPartner = response.data.user;
  // } catch (error) {
  //   console.error('Error:', error);
  // }




  async function fetchChatPartner(chatPartnerId, cookie) {
    let response;
    let result;
  
    try {
      const apiUrl = `${process.env.NEXTAUTH_URL}/api/friend/${chatPartnerId}`;
      response = await axios.get(apiUrl, {
        headers: {
          'Cookie': `${cookie.name}=${cookie.value}`
        }
      });
      result = response.data.user;
    } catch (error) {
      console.error('Error:', error);
    }
  
    return result;
  }
  const chatPartner = await fetchChatPartner(chatPartnerId, cookie);
  // fetch messages form database
  async function fetchMessages(chatId, cookie) {
    let response;
    let result;
    try {
      const apiUrl = `${process.env.NEXTAUTH_URL}/api/messages/${chatId}`;
      response = await axios.get(apiUrl, {
        headers: {
          'Cookie': `${cookie.name}=${cookie.value}`
        }
      });
      result = response.data;
    } catch (error) {
      console.error('Error:', error);
    }
    return result;
  }
  const initialMessages = await fetchMessages(chatId, cookie);
console.log("Initial Messages",initialMessages)
  const areFriend = chatPartner.friends.some((friend) => friend._id.toString() === user.id)
  if (!areFriend) return notFound();
  return (
    <div className='flex'>
      <div className='px-8 flex flex-col  max-h-[100vh]   bg-light_bg h-full w-full md:w-3/4  border-r-2'>
        <div className='flex flex-col gap-4 '>
          <div className='flex'>
            <Profile name={chatPartner.name} email={chatPartner.email} image={chatPartner.image} line={false} />
            <div className=' mt-8 ml-auto flex gap-6 items-center justify-center  text-primary'>
              <BsFillTelephoneFill className='text-2xl' />
              <BiSolidVideo className='text-3xl' />
              <BsInfoCircleFill className='text-2xl' />
            </div>
          </div>
          <div className=' h-[2px] bg-slate-300 bg-opacity-50'></div>
        </div>
        <div className=' overflow-y-scroll min-w-full'>
          <Message sessionId={session.user.id} initialMessages={initialMessages} />
        </div>
        <div className='w-full py-4 '>
          <ChatInput />
        </div>
      </div>
      <div className='hidden md:flex w-1/3'>
        <ChatDetailsBar name={chatPartner.name} image={chatPartner.image} friendId={chatPartnerId} />
      </div>

    </div>
  )
}

export default page