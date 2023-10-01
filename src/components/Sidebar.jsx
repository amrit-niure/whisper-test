'use client'
import React from 'react';
import Profile from './blocks/Profile';
import { GrHomeRounded } from 'react-icons/gr';
import { Cog, GitMerge, Plus, UserPlus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  const { data, status } = useSession()
  const friends = [
    { id: 1, name: 'Friend 1' },
    { id: 2, name: 'Friend 2' },
    // Add more friends here
  ];

  const groups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    // Add more groups here
  ];


  return (
    <div className="md:flex w-full bg-light_bg h-full rounded-l-lg  flex-col gap-2 border-r-2">
      {/* Profile Section */}
      <Profile name={data?.user.name} email={data?.user.email} image={data?.user.image}/>
      {/* Home > Dashboard */}
      <div >
        <h2 className=" text-primary font-semibold mb-2 px-4">Dashboard</h2>
        <ul className=''>
          <Link href={'/dashboard'}><li className=' pl-6 py-2 flex gap-2 hover:bg-light_bg_chat cursor-pointer'><GrHomeRounded className='text-xl  text-primary' /> Home</li> </Link>
          <Link href={'/dashboard/request'}>  <li className=' pl-6 pr-4 py-2 flex gap-2 hover:bg-light_bg_chat cursor-pointer'> <UserPlus className='text-xl  text-primary' /> Requests   <span className='bg-primary text-postitive rounded-full w-6 h-6 flex items-center justify-center text-small ml-auto'>2</span> </li></Link>
        </ul>
      </div>

      {/* Friends List */}
      <div>
        <div className="flex justify-between px-4">
          <h2 className=" text-primary font-semibold mb-2 ">Friends</h2>
          <span><Plus size={20} className='cursor-pointer  text-primary' /> </span>
        </div>

        <ul>
          {friends.map((friend) => (
             <Link href={'/dashboard/chat'}><li
              key={friend.id}
              className=" pl-6 pr-4 py-2 flex gap-2 hover:bg-light_bg_chat cursor-pointer"
            >
              <div className='flex gap-2'>
                <span>{data && <Image
                  src={data.user.image}
                  alt="Friend Picture"
                  width={25}
                  height={25}
                  className='rounded-full'
                />}</span>
                <span>{friend.name}</span>
              </div>

              <span className='bg-primary text-postitive rounded-full w-6 h-6 flex items-center justify-center text-small ml-auto'>2</span>

              {/* Add functionality to open chat with friend */}
            </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Group List */}
      <div>
        <div className="flex justify-between px-4">
          <h2 className=" text-primary font-semibold mb-2 ">Groups</h2>
          <span><Plus size={20} className='cursor-pointer  text-primary' /> </span>
        </div>
        <ul>
          {groups.map((group) => (
            <li
              key={group.id}
              className=" pl-6 py-2 flex gap-2 hover:bg-light_bg_chat cursor-pointer"
            >
              <span>{group.name}</span>
              {/* Add functionality to open chat with friend */}
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar footer section  */}
      <div className='pl-4 py-2 mt-auto'>
        <h1 className='flex text-primary gap-2 cursor-pointer'><Cog size={20} /> Settings</h1>
        <p className='flex text-primary gap-2 pl-1  text-small '> <GitMerge size={15} />Version 1.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
