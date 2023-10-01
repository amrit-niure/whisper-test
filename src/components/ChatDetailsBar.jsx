'use client'
import { IoNotificationsSharp } from 'react-icons/io5';
import Image from 'next/image';
import { BsImages, BsFileEarmarkText, BsLink45Deg } from 'react-icons/bs';
import React from 'react';
import { Search } from 'lucide-react';

const CollapsibleSection = ({ title, items, icon, children }) => {
  const [isContentVisible, setIsContentVisible] = React.useState(false);

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

const ChatDetailsBar = () => {
  return (
    <div className='w-full h-full py-8 px-2 flex flex-col gap-8'>
      <div className='flex flex-col gap-1 items-center justify-center w-full'>
        <Image
          src={'/avatar.jpg'}
          alt="User Photo"
          width={70}
          height={70}
          className='rounded-full'
        />
        <h2 className='font-semibold'>Bibek Ghimire</h2>
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
      </div>

    </div>
  );
};

export default ChatDetailsBar;
