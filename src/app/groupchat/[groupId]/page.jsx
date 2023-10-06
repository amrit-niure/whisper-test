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
  const { groupId } = params
  const cookieStore = cookies()
  const cookie = cookieStore.get(process.env.COOKIE_NAME)
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  async function fetchGroup(groupId, cookie) {
    let response;
    let result;
    console.log("Fetching Group Messages")
    try {
      const apiUrl = `${process.env.NEXTAUTH_URL}/api/group/${groupId}`;
      response = await axios.get(apiUrl, {
        headers: {
          'Cookie': `${cookie.name}=${cookie.value}`
        }
      });
      result = response.data.group;
    } catch (error) {
      console.error(error);
    }
    return result;
  }
  const groupData = await fetchGroup(groupId, cookie);

const initialMessages=groupData.messages;

  // Extract names of the first two members
  const firstTwoNames = groupData.members.slice(0, 2).map(member => member.name);
  let displayText;

  if (groupData.members.length === 2) {
    displayText = firstTwoNames.join(' and ');
  } else {
    // Check if there are additional members
    const remainingMembersCount = groupData.members.length - 2;
    const additionalMembersText = remainingMembersCount > 0 ? ` and ${remainingMembersCount} others` : '';
    // Concatenate the names and additional members text
    displayText = firstTwoNames.join(', ') + additionalMembersText;
  }
  return (
    <div className='flex'>
      <div className=' flex flex-col h-screen bg-light_bg  w-full md:w-3/4 md:border-r-2 pr-2 md:pr-4'>
        {/* Top Section */}
        <div className='flex flex-col gap-2 '>
          <div className='flex'>
            <Profile name={groupData.name} email={displayText} image={'/group.jpg'} line={false} />
            <div className='ml-auto flex gap-6 items-center justify-center text-primary '>
            <BsFillTelephoneFill className='text-xl md:text-xl' />
              <BiSolidVideo className='text-2xl md:text-2xl' />
              <BsInfoCircleFill className='text-xl md:text-xl' />
            </div>
          </div>
          <div className='h-[2px] bg-slate-300 bg-opacity-50'></div>
        </div>

        {/* Middle Section (Flex-1 to take up remaining space) */}
        <div className='  overflow-y-scroll flex-1 scrollbar'>
          <Message sessionId={session.user.id} initialMessages={initialMessages} userImage={session.user.image} />
        </div>

        {/* Bottom Section */}
        <div className='py-2 md:py-4 '>
          <ChatInput groupId={groupId} senderId={session.user.id} />
        </div>

      </div>

      <div className='hidden md:flex w-1/3'>
        <ChatDetailsBar groupData={groupData} image={'/group.jpg'} friendId={groupData._id} />
      </div>

    </div>
  )
}

export default page