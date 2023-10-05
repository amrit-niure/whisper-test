"use client"
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const Message = ({ initialMessages, sessionId,userImage, partnerImage}) => {

    const [messages, setMessages] = useState(initialMessages)

    const scrollDownRef = useRef(null)
    const formatTimestamp = (timestamp) => {
        if (!timestamp) {
            return '';
        }
        return format(parseISO(timestamp), 'HH:mm')
    }
    console.log(initialMessages)
    if(!initialMessages){
        return(<div>Loading...</div>)
    }
    return (
        <div className='text-sm flex flex-grow flex-col gap-2 '>
            <div ref={scrollDownRef} />
            {messages?.map((message, index) => {
                const isCurrentUser = message.sender === sessionId
                const hasNextMessageFromSameUser = messages[index + 1]?.sender === messages[index].sender
                return (
                    <div key={`${message._id}-${message.createdAt}`} className=''>
                        <div
                            className={cn('flex items-end', {
                                'justify-end': isCurrentUser,
                            })}>
                            <div
                                className={cn(
                                    ' space-y-2 text-sm max-w-xs mx-2',
                                    {
                                        'order-1 items-end': isCurrentUser,
                                        'order-2 items-start': !isCurrentUser,
                                    }
                                )}>
                                <span
                                    className={cn('px-4 py-2 rounded-lg inline-block', {
                                        'bg-primary text-white': isCurrentUser,
                                        'bg-light_bg_chat text-gray-900': !isCurrentUser,
                                        'rounded-br-none':
                                            isCurrentUser,
                                        'rounded-bl-none':
                                             !isCurrentUser,
                            
                                    })}>
                                    {message.text}
                                    <span className='ml-2 text-xs text-gray-400'>
                                        {formatTimestamp(message.createdAt)}
                                    </span>
                                </span>
                            </div>

                            <div
                                className={cn('relative w-6 h-6', {
                                    'order-2': isCurrentUser,
                                    'order-1': !isCurrentUser,
                                    invisible: hasNextMessageFromSameUser,
                                })}>
                                <Image
                                    fill
                                    src={
                                        isCurrentUser ? userImage : partnerImage
                                    }
                                    alt='Profile picture'
                                    referrerPolicy='no-referrer'
                                    className='rounded-full'
                                />
                            </div>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}

export default Message
































