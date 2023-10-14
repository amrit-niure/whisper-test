'use client'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { pusherClient } from '@/lib/pusherServer'

const Message = ({ initialMessages, sessionId, userImage, partnerImage, chatId,groupId }) => {
  const [messages, setMessages] = useState(initialMessages)
  const scrollDownRef = useRef(null)
const [loading,setLoading] = useState(false)
  useLayoutEffect(() => {
    // Scroll to the bottom after the DOM has been painted
    if (scrollDownRef.current) {
      scrollDownRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    pusherClient.subscribe('message_channel')
    pusherClient.subscribe('group_message_channel')
    
    const messageHandler = ({ msg, prevChatId }) => {
      if (chatId === prevChatId) {
        setMessages((prev) => [...prev, msg])
      } 
    }
    const groupMessageHandler = ({ msg, grpId }) => {
      if (groupId === grpId) {
        console.log(msg)
        setMessages((prev) => [...prev, msg])
      } 
    }

    pusherClient.bind('message_event', messageHandler)
    pusherClient.bind('group_message_event', groupMessageHandler)
    return () => {
      pusherClient.unsubscribe('message_channel')
      pusherClient.unsubscribe('group_message_channel')
      pusherClient.unbind('message_event', messageHandler)
      pusherClient.unbind('group_message_event', messageHandler)
    }
  }, [chatId,groupId])

  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return ''
    }
    return format(parseISO(timestamp), 'HH:mm') || format(timestamp, 'HH:mm');
  }

  if (!initialMessages) {
    return <div>Loading...</div>
  }
  const timestamp = Date.now();
  const formattedTime = format(timestamp, 'HH:mm');
  return (
    <div className="text-sm flex flex-grow flex-col gap-2 mt-auto overflow-y-scroll scrollbar">
      {messages?.map((message, index) => {
        const isCurrentUser = partnerImage ? message.sender === sessionId : message.sender._id === sessionId
        // const isCurrentUser =  message.sender._id === sessionId
        const hasNextMessageFromSameUser = messages[index + 1]?.sender === messages[index].sender

        return (
          <div key={`${message._id}-${message.createdAt}`} >
            <div
              className={cn('flex items-end', {
                'justify-end': isCurrentUser,
              })}
            >
              <div
                className={cn(' space-y-2 text-sm max-w-xs mx-2', {
                  'order-1 items-end': isCurrentUser,
                  'order-2 items-start': !isCurrentUser,
                })}
              >
                <span
                  className={cn('px-4 py-2 rounded-lg inline-block', {
                    'bg-primary text-white': isCurrentUser,
                    'bg-light_bg_chat text-gray-900': !isCurrentUser,
                    'rounded-br-none': isCurrentUser,
                    'rounded-bl-none': !isCurrentUser,
                  })}
                >
                  {message.text}
                  <span className="ml-2 text-xs text-gray-400">{formatTimestamp(message.createdAt )|| formattedTime}</span>
                </span>
              </div>

              <div
                className={cn('relative w-6 h-6', {
                  'order-2': isCurrentUser,
                  'order-1': !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <Image
                  fill
                  src={isCurrentUser ? userImage : partnerImage || message.sender.image}
                  alt="Profile picture"
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        )
      })}
      <div ref={scrollDownRef}></div>
    </div>
  )
}

export default Message
