'use client'
import React, { useEffect, useState } from 'react';
import Profile from './blocks/Profile';
import { GrHomeRounded } from 'react-icons/gr';
import { Cog, GitMerge, LogOut, MoreVertical, Plus, UserPlus } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Sidebar = () => {
  const { data, status } = useSession()
  const userId = data?.user.id
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({})
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (data) {
      const getUserData = async () => {
        let response;
        try {
          const apiUrl = `/api/friend/${data.user.id}`;
          response = await axios.get(apiUrl);
          setUser(response.data.user);
          setFriends(response.data.user.friends)

        } catch (error) {
          console.error('Error:', error);
        } finally {
        }
        setLoading(false)
      };
      getUserData();
    }
  }, [data]);





  if (loading) {
    return (<div className='px-4 py-6 max-h-[100vh] w-full flex flex-col'>
      <SkeletonTheme baseColor='#EAEAEA' highlightColor="#F5F6F6">
        <div className='flex-1'>
          <div className=' flex gap-2 items-center'>
            <Skeleton height={'60px'} width={'60px'} borderRadius={'50%'} />
            <div>
              <Skeleton height={'20px'} width={'100px'} />
              <Skeleton height={'10px'} width={'200px'} />
            </div>
          </div>
          <Skeleton height={'1px'} width={'100%'} />
          <div className='flex flex-col gap-2'>
            <Skeleton height={'20px'} width={'100px'} />
            <div className='px-4 flex flex-col gap-2'>
              <Skeleton height={'20px'} width={'100%'} />
              <Skeleton height={'20px'} width={'100%'} />
            </div>
          </div>
          <div className='flex flex-col gap-2 py-4'>
            <Skeleton height={'20px'} width={'100px'} />
            <div className='px-4 flex flex-col gap-2'>
              <Skeleton height={'20px'} width={'100%'} />
              <Skeleton height={'20px'} width={'100%'} />
            </div>
          </div>
          <div className='flex flex-col gap-2 py-4'>
            <Skeleton height={'20px'} width={'100px'} />
            <div className='px-4 flex flex-col gap-2'>
              <Skeleton height={'20px'} width={'100%'} />
              <Skeleton height={'20px'} width={'100%'} />
            </div>
          </div>
        </div>
    
        <div className='px-4 flex flex-col gap-2'>
          <Skeleton height={'20px'} width={'50%'} />
          <Skeleton height={'20px'} width={'50%'} />
        </div>

      </SkeletonTheme>
    </div>)
  }






  return (
    <div className="md:flex w-full bg-light_bg h-full  text-sm   flex-col gap-2 border-r-2">
      {<Profile name={data?.user.name} email={data?.user.email} image={data?.user.image} />}
      <div >
        <h2 className=" text-primary font-semibold mb-2 px-4">Dashboard</h2>
        <ul>
          <Link href={'/dashboard'}><li className=' pl-6 py-2 flex gap-2 hover:bg-light_bg_chat cursor-pointer'><GrHomeRounded className='text-xl  text-primary' /> Home</li> </Link>
          <Link href={'/dashboard/request'}>  <li className=' pl-6 pr-4 py-2 flex gap-2 hover:bg-light_bg_chat cursor-pointer'> <UserPlus className='text-xl  text-primary' /> Requests   {user.incoming_request?.length !== 0 && <span className='bg-primary text-postitive rounded-full w-5 h-5 flex items-center justify-center text-small ml-auto'>  {user.incoming_request?.length}</span>} </li></Link>
        </ul>
      </div>

      <div className='scrollbar overflow-y-scroll scrollbar-hide'>
        <div>
          <div className="flex justify-between px-4">
            <h2 className=" text-primary font-semibold mb-2 ">Friends</h2>
          </div>
          <ul className=''>
            {friends?.map((friend, index) => (
              <Link href={`/dashboard/chat/${data.user.id}--${friend._id}`} key={friend._id}
                className='relative'
              ><li
                className=" pl-6 pr-4 py-2 flex gap-2 items-center hover:bg-light_bg_chat cursor-pointer relative "
              >
                  <div className='flex gap-2 items-center'>
                    <span>{data && <Image
                      src={friend.image}
                      alt="Friend Picture"
                      width={25}
                      height={25}
                      className='rounded-full'
                    />}</span>
                    <span>{friend.name}</span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/* Group List */}
        <div>
          <div className="flex justify-between px-4">
            <h2 className=" text-primary font-semibold mb-2 ">Groups</h2>
            {/* <span><Plus size={20} className='cursor-pointer  text-primary' /> </span> */}
          </div>
          <ul>
            {user.groups?.map((group) => (
              <li
                key={group._id}
                className=" pl-6 py-2 flex gap-2 hover:bg-light_bg_chat cursor-pointer"
              >
                <span>{group.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='pl-4 py-2 mt-auto relative'>
        <h1 className='flex text-primary gap-2  cursor-pointer w-fit hover:text-blue-800 hover:underline' onClick={() => setShow(!show)}><Cog size={20} /> Settings</h1>
        <p className='flex text-primary gap-2 pl-1  '> <GitMerge size={15} />Version 1.0</p>
        {show && <div className='absolute -top-14 right-10 w-3/5 rounded-lg bg-slate-200  py-2'>
          <p className='hover:bg-light_bg_chat cursor-pointer px-2 py-1 flex gap-2' onClick={() => signOut()}> <LogOut /> Log Out</p>
        </div>}
      </div>
    </div>
  );
};

export default Sidebar;
