"use client"
import React from 'react'
import { Check, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { pusherClient } from '@/lib/pusherServer'

const IncomingRequest = ({ incoming_request, group_invitation, userId }) => {
    const router = useRouter()
    const [friendRequests, setFriendRequests] = useState([])
    const [groupRequests, setGroupRequests] = useState([])
    useEffect(() => {
        if (incoming_request) {
            setFriendRequests(incoming_request);
        } else {
            setGroupRequests(group_invitation);
        }
    }, [incoming_request, group_invitation])

    // realtime 
    useEffect(() => {
        const friendRequestHandler = ({ _id, name, email }) => {
            setFriendRequests((prev) => [...prev, { _id, name, email }])
        }
        const groupRequestHandler = ({ _id, name }) => {
            setGroupRequests((prev) => [...prev, { _id, name }])
        }

        pusherClient.subscribe('incoming-friend-request-channel')
        pusherClient.subscribe('incoming-group-request-channel')

        pusherClient.bind("incoming-friend-request-event", friendRequestHandler)
        pusherClient.bind("incoming-group-request-event", groupRequestHandler)

        return () => {
            pusherClient.unsubscribe('incoming-friend-request-channel')
            pusherClient.unbind('incoming-friend-request-event')
            pusherClient.unsubscribe('incoming-group-request-channel')
            pusherClient.unbind('incoming-group-request-event')
        }
    }, [])

    const acceptFriend = async (senderId, groupId) => {
        try {
            if (incoming_request) {
                await axios.post('/api/friend/request/accept', { id: senderId })
                setFriendRequests((prev) =>
                    prev.filter((request) => request._id !== senderId)
                )
            } else {
                await axios.get(`/api/group/users/${senderId}/accept/${groupId}`)
                setGroupRequests((prev) =>
                    prev.filter((request) => request._id !== senderId)
                )
            }

            incoming_request ? (toast.success("Friend Request Accepted !")) : (toast.success("Group Request Accepted !"))
        } catch (error) {
            toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
            console.log(error)
        } finally {
            router.refresh()
        }
    }


    const denyFriend = async (senderId, groupId) => {
        try {
            if (incoming_request) {
                const response = await axios.post('/api/friend/request/deny', { id: senderId })
                toast.success(response.data.message)
                setFriendRequests((prev) =>
                    prev.filter((request) => request._id !== senderId)
                )
            } else {
                const response = await axios.get(`/api/group/users/${senderId}/decline/${groupId}`)
                toast.success(response.data.message)
                setGroupRequests((prev) =>
                    prev.filter((request) => request._id !== senderId)
                )
            }


        } catch (error) {
            toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
        }
        router.refresh()
    }
return (
    incoming_request ? (
        <div>
            <Toaster />
            {friendRequests?.length === 0 ? (
                <p className='text-sm text-zinc-500'>No freind requests</p>
            ) : (
                friendRequests?.map((req) => (
                    <div className='flex gap-4 py-4 bg-light_bg_chat px-4 cursor-pointer' key={req._id}>
                        <div className='flex gap-2 items-center'>
                            <Image
                                src='/avatar.jpg'
                                alt="User Photo"
                                width={50}
                                height={50}
                                className='rounded-full'
                            />
                            <div>
                                <h2 className='text-medium font-semibold'>{req.name}</h2>
                                <p className='text-small text-secondary'>{req.email}</p>
                            </div>
                        </div>


                        <div className='ml-auto flex gap-8 items-center'>
                            {incoming_request ? (<div className='flex gap-8'>
                                <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                                    onClick={() => acceptFriend(req._id)}
                                >
                                    <Check size={20} />
                                    Accept
                                </div>
                                <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                                    onClick={() => denyFriend(req._id)}
                                >
                                    <X size={20} />
                                    Decline
                                </div>
                            </div>) : (
                                <div className='flex gap-8'>
                                    <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                                        onClick={() => acceptFriend(userId, req._id)}
                                    >
                                        <Check size={20} />
                                        Accept
                                    </div>
                                    <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                                        onClick={() => denyFriend(userId, req._id)}
                                    >
                                        <X size={20} />
                                        Decline
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                )))
            }
        </div>
    ) : (
        <div>
            <Toaster />
            {groupRequests?.length === 0 ? (
                <p className='text-sm text-zinc-500'>No group requests..</p>
            ) : (
                groupRequests?.map((req) => (
                    <div className='flex gap-4 py-4 bg-light_bg_chat px-4 cursor-pointer' key={req._id}>
                        <div className='flex gap-2 items-center'>
                            <Image
                                src='/avatar.jpg'
                                alt="User Photo"
                                width={50}
                                height={50}
                                className='rounded-full'
                            />
                            <div>
                                <h2 className='text-medium font-semibold'>{req.name}</h2>
                      
                            </div>
                        </div>


                        <div className='ml-auto flex gap-8 items-center'>
                            {incoming_request ? (<div className='flex gap-8'>
                                <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                                    onClick={() => acceptFriend(req._id)}
                                >
                                    <Check size={20} />
                                    Accept
                                </div>
                                <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                                    onClick={() => denyFriend(req._id)}
                                >
                                    <X size={20} />
                                    Decline
                                </div>
                            </div>) : (
                                <div className='flex gap-8'>
                                    <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                                        onClick={() => acceptFriend(userId, req._id)}
                                    >
                                        <Check size={20} />
                                        Accept
                                    </div>
                                    <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                                        onClick={() => denyFriend(userId, req._id)}
                                    >
                                        <X size={20} />
                                        Decline
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                )))
            }
        </div>
    )
)
    

}

export default IncomingRequest