"use client"
import React from 'react'
import { Check, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

const IncomingRequest = ({ incoming_request,group_invitation,userId}) => {
    const router = useRouter()
    const [requests, setRequests] = useState([])
    useEffect(() => {
        if (incoming_request) {
            setRequests(incoming_request);
        } else {
            setRequests(group_invitation);
        }
    }, [incoming_request, group_invitation])

    const acceptFriend = async (senderId,groupId) => {
        try {
            if (incoming_request) {
                await axios.post('/api/friend/request/accept', { id: senderId })
            } else {
                await axios.get(`/api/group/users/${senderId}/accept/${groupId}`)  
            }
            setRequests((prev) =>
                prev.filter((request) => request._id !== senderId)
            )
           incoming_request ?(toast.success("Friend Request Accepted !")) : (toast.success("Group Request Accepted !"))
        } catch (error) {
            toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
            console.log(error)
        } finally {
            router.refresh()
        }
    }


    const denyFriend = async (senderId,groupId) => {
        try {
            if (incoming_request) {
                const response = await axios.post('/api/friend/request/deny', { id: senderId })
                toast.success(response.data.message)
            } else {
                const response =  await axios.get(`/api/group/users/${senderId}/decline/${groupId}`)  
                toast.success(response.data.message)
            }
            setRequests((prev) =>
                prev.filter((request) => request._id !== senderId)
            )
           
        } catch (error) {
            toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
        }
        router.refresh()
    }
    return (
        <div>
            <Toaster />
            {requests?.length === 0 ? (
                <p className='text-sm text-zinc-500'>{incoming_request ? "No freind requests" : "No group requests"}</p>
            ) : (
                requests?.map((req) => (
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
                           { incoming_request ? (<div className='flex gap-8'>
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
                            </div>) :(
                                <div className='flex gap-8'>
                                <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                                    onClick={() => acceptFriend(userId,req._id)}
                                >
                                    <Check size={20} />
                                    Accept
                                </div>
                                <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                                    onClick={() => denyFriend(userId,req._id)}
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
}

export default IncomingRequest