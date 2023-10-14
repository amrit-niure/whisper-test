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
import Header from '@/components/Header'

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
  const areFriend = chatPartner.friends.some((friend) => friend._id.toString() === user.id)
  if (!areFriend) return notFound();
  return (
    <div className='flex'>
      <div className='px- md:px-8 flex flex-col max-h-[100vh] min-h-[100vh]  bg-light_bg h-full w-full md:w-3/4 border-r-2'>
        {/* Top Section */}
        <div className='flex flex-col gap-2 md:gap-4 h-1/4 '>
          <div className='flex'>
            <Profile name={chatPartner.name} email={chatPartner.email} image={chatPartner.image} line={false} />
            <div className='mt-4 md:mt-8 ml-auto flex gap-6 items-center justify-center text-primary px-2'>
              <BsFillTelephoneFill className='text-xl md:text-2xl' />
              <BiSolidVideo className='text-2xl md:text-3xl' />
              <BsInfoCircleFill className='text-xl md:text-2xl' />
            </div>
          </div>
          <div className='h-[2px] bg-slate-300 bg-opacity-50'></div>
        </div>

        {/* Middle Section (Flex-1 to take up remaining space) */}
        <div className='  overflow-y-scroll flex-1 scrollbar'>
          <Message sessionId={session.user.id} initialMessages={initialMessages} userImage={session.user.image} partnerImage={chatPartner.image}  />
        </div>

        {/* Bottom Section */}
        <div className='py-4 h-1/4 px-4 md:px-0'>
          <ChatInput chatId={chatId} recipientId={chatPartnerId} />
        </div>

      </div>

      <div className='hidden md:flex w-1/3'>
        <ChatDetailsBar name={chatPartner.name} image={chatPartner.image} friendId={chatPartnerId} />
      </div>

    </div>
  )
}

export default page