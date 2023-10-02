'use client'
import { IoNotificationsSharp } from 'react-icons/io5';
import Image from 'next/image';
import { BsImages, BsFileEarmarkText, BsLink45Deg } from 'react-icons/bs';
import React, { useState } from 'react';
import { Search, UserMinus } from 'lucide-react';
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const CollapsibleSection = ({ title, items, icon, children }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div>
      <h2 onClick={toggleContent} className='cursor-pointer flex items-center gap-2 hover:bg-light_bg_chat py-1 px-2'>
        {icon} {/* Render icon for the top-level item */}
        {title}
      </h2>
      {isContentVisible && (
        <div>
          <ul>
            {items.map((item, index) => (
              <li key={index} className='hover:bg-light_bg_chat py-1 px-2'>{item}</li>
            ))}
          </ul>
          {children} {/* Render nested collapsible sections */}
        </div>
      )}
    </div>
  );
};

const ChatDetailsBar = ({name, image,friendId}) => {
  const router = useRouter()
  const [showUnfriend, setShowUnfriend] = useState(false);

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

  return (
    <div className='w-full h-full py-8 px-2 flex flex-col gap-8'>
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
      <div className='flex flex-col gap-2'>
      <h2 className='flex gap-2 items-center hover:bg-light_bg_chat py-1 px-2'><Search size={20}/> Search in Conversation</h2>
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
        <CollapsibleSection title="Files" items={['Document 1', 'Document 2', 'Document 3']}   icon={<BsImages />}/>
        {/* Nested CollapsibleSection for Links */}
        <CollapsibleSection title="Links" items={['Link 1', 'Link 2', 'Link 3']}    icon={<BsImages />}/>
      </CollapsibleSection>
      <h2 className='flex gap-2 items-center hover:bg-light_bg_chat py-1 px-2 cursor-pointer' onClick={() => setShowUnfriend(!showUnfriend)}> <UserMinus size={20} />Unfriend</h2>
{showUnfriend && (<div className='flex flex-col px-10'> 
  <p className='text-small'>Are you sure you want to unfriend {name}?</p>
  <div className='flex gap-2 text-small self-end'>
    <button className='bg-primary text-white px-2 py-1 ' onClick={() => { 
      removeFriend(friendId)
      setShowUnfriend(!showUnfriend)}
      }>Yes</button>
    <button className='bg-slate-200 text-slate-400 px-2 py-1 ' onClick={() => setShowUnfriend(!showUnfriend)}>No</button>
  </div>
</div>)}
      </div>
    </div>
  );
};

export default ChatDetailsBar;
