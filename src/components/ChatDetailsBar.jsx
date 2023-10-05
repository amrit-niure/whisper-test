'use client'
import { IoNotificationsSharp } from 'react-icons/io5';
import Image from 'next/image';
import { BsImages, BsFileEarmarkText, BsLink45Deg } from 'react-icons/bs';
import React, { useState } from 'react';
import { Search, UserMinus, Users } from 'lucide-react';
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useSession } from 'next-auth/react';
const CollapsibleSection = ({ title, items, icon, children }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className=''>
      <h2 onClick={toggleContent} className='cursor-pointer flex items-center gap-2 hover:bg-light_bg_chat py-2 px-2'>
        {icon} {/* Render icon for the top-level item */}
        {title}
      </h2>
      {isContentVisible && (
        <div>
          <ul>
            {items.map((item, index) => (
              <li key={index} className='hover:bg-light_bg_chat py-2 px-10'>{item}</li>
            ))}
          </ul>
          {children} {/* Render nested collapsible sections */}
        </div>
      )}
    </div>
  );
};

const ChatDetailsBar = ({ name, image, friendId, groupData }) => {
  const router = useRouter()
  const [showUnfriend, setShowUnfriend] = useState(false);
  const namesList = groupData?.members.map(member => member.name);
  const {data,status} = useSession()
  if(status==='unauthenticated'){
    router.push('/login')
  }
  const removeFriend = async (friendId) => {
    try {
      console.log(friendId)
      await axios.post('/api/friend/unfriend', { id: friendId })
      router.push('/dashboard')
      toast.success("Succesfully Unfriended !")
    } catch (error) {
      toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
      console.log(error)
    } finally {
      router.refresh()
    }
  }
  const leaveGroup = async (groupId) => {
    try {
      await axios.post('/api/group/leave', { groupId: groupId, userId: data.user.id })
      router.push('/dashboard')
      toast.success("Succesfully Left the group !")
    } catch (error) {
      toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
      console.log(error)
    } finally {
      router.refresh()
    }
  }

  return (
    <div className=' text-sm w-full h-full py-8 px-2 flex flex-col gap-8'>
      <Toaster />
      <div className='flex flex-col gap-1 items-center justify-center w-full'>
        <Image
          src={image}
          alt="User Photo"
          width={70}
          height={70}
          className='rounded-full'
        />
        <h2 className='font-semibold'>{name}</h2>
        <p className='text-small'>Active Now</p>
        <IoNotificationsSharp className='text-xl' />
      </div>
      <div className='flex flex-col '>
        <h2 className='flex gap-2 items-center hover:bg-light_bg_chat py-2 px-2'><Search size={20} /> Search in Conversation</h2>
        {/* Nested CollapsibleSection for Media */}
        <CollapsibleSection
          title="Media Files and Links"
          items={[]}

        >
          {/* Nested CollapsibleSection for Media */}
          <CollapsibleSection
            title="Media"
            items={['Image', 'Video', 'Audio']}
            icon={<BsImages />}
          />
          {/* Nested CollapsibleSection for Files */}
          <CollapsibleSection title="Files" items={['Document 1', 'Document 2', 'Document 3']} icon={<BsImages />} />
          {/* Nested CollapsibleSection for Links */}
          <CollapsibleSection title="Links" items={['Link 1', 'Link 2', 'Link 3']} icon={<BsImages />} />
        </CollapsibleSection>
        {name && <h2 className='flex items-center hover:bg-light_bg_chat py-2 px-2 cursor-pointer' onClick={() => setShowUnfriend(!showUnfriend)}> <UserMinus size={20} />Unfriend</h2>}
        {groupData && <>
          <CollapsibleSection
            title="Group Members"
            items={namesList}
            icon={<Users size={20} />}

          />
          <h2 className='flex gap-2 items-center hover:bg-light_bg_chat py-2 px-2 cursor-pointer' onClick={() => setShowUnfriend(!showUnfriend)}> <UserMinus size={20} />Leave Group </h2>
        </>}
        {showUnfriend && (<div className='flex flex-col px-10'>
          {<p className='text-small'>Are you sure you want to {name ? "Unfriend" : "Leave"} {name ? name : groupData.name}?</p>}
          <div className='flex text-small self-end'>
            {name && <button className='bg-primary text-white px-2 py-2 ' onClick={() => {
              removeFriend(friendId)
              setShowUnfriend(!showUnfriend)
            }
            }>Yes</button>}
            {groupData && <button className='bg-primary text-white px-2 py-2 ' onClick={() => {
              leaveGroup(groupData._id)
              setShowUnfriend(!showUnfriend)
            }
            }>Yes</button>}
            <button className='bg-slate-200 text-slate-400 px-2 py-2 ' onClick={() => setShowUnfriend(!showUnfriend)}>No</button>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default ChatDetailsBar;
