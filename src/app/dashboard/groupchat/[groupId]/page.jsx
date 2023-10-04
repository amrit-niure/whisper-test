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
  const { user } = session;

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
  console.log(groupData)
  // const initialMessages = await fetchMessages(chatId, cookie);


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
      <div className='px-8 flex flex-col max-h-[100vh] min-h-[100vh]  bg-light_bg h-full w-full md:w-3/4 border-r-2'>

        {/* Top Section */}
        <div className='flex flex-col gap-4 h-1/4'>
          <div className='flex'>
            <Profile name={groupData.name} email={displayText} image={'/avatar.jpg'} line={false} />
            <div className='mt-8 ml-auto flex gap-6 items-center justify-center text-primary'>
              <BsFillTelephoneFill className='text-2xl' />
              <BiSolidVideo className='text-3xl' />
              <BsInfoCircleFill className='text-2xl' />
            </div>
          </div>
          <div className='h-[2px] bg-slate-300 bg-opacity-50'></div>
        </div>

        {/* Middle Section (Flex-1 to take up remaining space) */}
        <div className='  overflow-y-scroll flex-1 scrollbar'>
          {/* <Message sessionId={session.user.id} initialMessages={initialMessages} userImage={session.user.image} partnerImage={chatPartner.image}  /> */}
        </div>

        {/* Bottom Section */}
        <div className='py-4 h-1/4'>
          <ChatInput chatId={'3424'} recipientId={'45353'} />
        </div>

      </div>

      <div className='hidden md:flex w-1/3'>
        <ChatDetailsBar groupData={groupData} image={'/avatar.jpg'} friendId={groupData._id} />
      </div>

    </div>
  )
}

export default page