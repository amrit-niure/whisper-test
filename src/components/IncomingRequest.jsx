"use client"
import React from 'react'
import { Check, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

const IncomingRequest = ({ incoming_request }) => {
    const router = useRouter()
    const [friendRequests, setFriendRequests] = useState(
        incoming_request
    )
    console.log(friendRequests)


    // const acceptFriend = async (senderId) => {
    //     try {
    //         await axios.post('/api/friend/request/accept', { id: senderId })
    //         setFriendRequests((prev) =>
    //             prev.filter((request) => request._id !== senderId)
    //         )
    //         toast.success("Friend Request Accepted !")
    //     } catch (error) {
    //         toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
    //     } finally {
    //         router.refresh()
    //     }
    // }



    // const denyFriend = async (senderId) => {
    //     try {
    //         await axios.post('/api/friend/request/deny', { id: senderId })

    //         setFriendRequests((prev) =>
    //             prev.filter((request) => request._id !== senderId)
    //         )
    //         toast.success("Friend Request Denied !")
    //     } catch (error) {
    //         toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
    //     }
    //     router.refresh()
    // }
    return (
        <div>
          <Toaster />
            {friendRequests?.length === 0 ? (
                <p className='text-sm text-zinc-500'>No friend requests...</p>
            ) : (
                //  friendRequests?.map((req) => (
                //     <div className='flex gap-4 py-4 bg-light_bg_chat px-4 cursor-pointer' key={req._id}>
                //         <div className='flex gap-2 items-center'>
                //             <Image
                //                 src='/avatar.jpg'
                //                 alt="User Photo"
                //                 width={50}
                //                 height={50}
                //                 className='rounded-full'
                //             />
                //             <div>
                //                 <h2 className='text-medium font-semibold'>{req.name}</h2>
                //                 <p className='text-small text-secondary'>{req.email}</p>
                //             </div>
                //         </div>

                
                //         <div className='ml-auto flex gap-8 items-center'>
                //             <div className='flex gap-8'>
                //                 <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                //                     onClick={() => acceptFriend(req._id)}
                //                 >
                //                     <Check size={20} />
                //                     Accept
                //                 </div>
                //                 <div className='flex px-2 py-1 gap-2 items-center hover:bg-slate-200 '
                //                     onClick={() => denyFriend(req._id)}
                //                 >
                //                     <X size={20} />
                //                     Decline
                //                 </div>
                //             </div>
                          
                          
                //         </div>
                //     </div>
                // )))
          <h1>You have some requests..</h1>  )
            } 
     
   
        </div>
    )
}

export default IncomingRequest