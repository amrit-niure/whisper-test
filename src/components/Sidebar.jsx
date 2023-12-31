'use client'
import React, { useEffect, useState } from 'react';
import Profile from './blocks/Profile';
import { GrHomeRounded } from 'react-icons/gr';
import { Cog, GitMerge, LogOut, UserPlus } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import SidebarLoading from './Loading/SidebarLoading';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/state/modalSlice';
import { pusherClient } from '@/lib/pusherServer';
import { chatHerfConstructor } from '@/lib/utils';

const Sidebar = () => {
  const dispatch = useDispatch()

  const { data, status } = useSession()
  const userId = data?.user.id
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({})
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)

  const [unseenRequestCount, setUnseenRequestCount] = useState()
  const addHandler = (payload) => {
    if (payload.userId === data.user.id) {
      setUnseenRequestCount(prev => prev + 1)
    }
  }
  const acceptHandler = (payload) => {
    setUnseenRequestCount(prev => prev - 1)
    console.log(payload)
    if (data.user.id === payload.user._id) {
      setFriends(prev => [...prev, payload.friend])
    }
    if (data.user.id === payload.friend._id) {
      setFriends(prev => [...prev, payload.user])
    }
  }
  useEffect(() => {
    pusherClient.subscribe("add-channel")
    pusherClient.subscribe("accept-deny-channel")
    pusherClient.bind("add-event", addHandler)
    pusherClient.bind("accept-deny-event", acceptHandler)
    return () => {
      pusherClient.unsubscribe("add-channel")
      pusherClient.unsubscribe("accept-deny-channel")
      pusherClient.unbind("add-event", addHandler)
      pusherClient.unbind("accept-deny-event", acceptHandler)
    }
  }, [userId])

  useEffect(() => {
    if (data) {
      const getUserData = async () => {
        let response;
        try {
          const apiUrl = `/api/friend/${data.user.id}`;
          response = await axios.get(apiUrl);
          setUser(response.data.user);
          setFriends(response.data.user.friends)
          const number = response.data.user.incoming_request.length + response.data.user.group_invitation.length
          setUnseenRequestCount(number)
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
    return (<SidebarLoading />)
  }

  return (
    <div className="flex w-full bg-light_bg h-full  px-4 text-sm py-2 md:py-0 flex-col gap-2 ">
      {<Profile name={data?.user.name} email={data?.user.email} image={data?.user.image} />}
      <div >
        <h2 className=" text-primary font-semibold mb-2">Dashboard</h2>
        <ul>
          <Link href={'/dashboard'}><li className=' pl-4 py-2 flex gap-2 hover:bg-light_bg_chat cursor-pointer         '
            onClick={() => dispatch(toggleModal())}
          ><GrHomeRounded className='text-xl  text-primary' /> Home</li> </Link>
          <Link href={'/request'}>
            <li className=' pl-4 pr-4 py-2 flex gap-2 hover:bg-light_bg_chat cursor-pointer'
              onClick={() => dispatch(toggleModal())}
            >
              {/* <UserPlus className='text-xl  text-primary' /> Requests <span className='bg-primary text-postitive rounded-full w-5 h-5 flex items-center justify-center text-small ml-auto'>{unseenRequestCount} </span> */}
              <UserPlus className='text-xl  text-primary' /> Requests {unseenRequestCount > 0 ? <span className='bg-primary text-postitive rounded-full w-5 h-5 flex items-center justify-center text-small ml-auto'>{unseenRequestCount} </span> : null}
            </li>
          </Link>
        </ul>
      </div>

      <div className='scrollbar overflow-y-scroll scrollbar-hide'>
        <div>
          <div className="flex justify-between ">
            <h2 className=" text-primary font-semibold mb-2 ">Friends</h2>
          </div>
          <ul className=''>
            {friends?.map((friend, index) => (
              <Link href={`/chat/${chatHerfConstructor(data.user.id, friend._id)}`} key={friend._id}
                className='relative'
              ><li
                className=" pl-4 pr-4 py-2 flex gap-2 items-center hover:bg-light_bg_chat cursor-pointer relative "
                onClick={() => dispatch(toggleModal())}
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
          <div className="flex justify-between ">
            <h2 className=" text-primary font-semibold mb-2 ">Groups</h2>
            {/* <span><Plus size={20} className='cursor-pointer  text-primary' /> </span> */}
          </div>
          <ul>
            {user.groups?.map((group) => (
              <Link href={`/groupchat/${group._id}`} key={group._id}>
                <li
                  className=" pl-4 py-2 flex gap-2 hover:bg-light_bg_chat cursor-pointer"
                  onClick={() => dispatch(toggleModal())}
                >
                  <span>{group.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className='pl-2 py-2 mt-auto relative'>
        <h1 className='flex text-primary gap-2  cursor-pointer w-fit hover:text-blue-800 hover:underline' onClick={() => setShow(!show)}><Cog size={20} /> Settings</h1>
        <p className='flex text-primary gap-2 pl-1  '> <GitMerge size={15} />Version 1.0</p>
        {show && <div className='absolute -top-14 right-10 w-3/5 rounded-lg bg-slate-200  py-2'>
          <p className='hover:bg-light_bg_chat cursor-pointer px-2 py-1 flex gap-2' onClick={() => {
            signOut()
            dispatch(toggleModal())
          }}> <LogOut /> Log Out</p>
        </div>}
      </div>
    </div>
  );
};

export default Sidebar;
