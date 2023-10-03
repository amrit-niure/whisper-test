"use client"
import React, { useRef, useState } from 'react';
import { Image, Paperclip, SendHorizontal } from 'lucide-react';
import { HiOutlineGif } from 'react-icons/hi2';
import ReactTextareaAutosize from 'react-textarea-autosize';
import axios from "axios";
import { toast } from "react-hot-toast";

const ChatInput = ({chatId, recipientId}) => {
  const textareaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("");
  const sendMessage = async () => {
    setIsLoading(true)
    try {
      if(!input) return
        // await new Promise((resolve) => setTimeout(resolve ,1000))
        await axios.post(`/api/send/messages/${chatId}`,{text:input , recipientId: recipientId })
        setInput('')
        textareaRef.current?.focus()
    } catch (error) {
        toast.error("Something went wrong.Please try again later." )
    }finally{
        setIsLoading(false)
    }
  };

  return (
    <form encType="multipart/form-data">
      <div className='flex w-full items-center gap-4 text-primary'>
        <Paperclip className='cursor-pointer' />
        <Image size={26} className='cursor-pointer' />
        <HiOutlineGif className='text-3xl cursor-pointer' />
         <ReactTextareaAutosize
          ref={textareaRef}
          onClick={() => textareaRef.current?.focus()}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Type a message`}
          className="block w-full resize-none h-8 px-2 outline-none bg-light_bg_chat rounded-lg text-black  border-2 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />
        <button type='submit' disabled={isLoading} onClick={sendMessage} > <SendHorizontal size={28} className='cursor-pointer' /> </button>
      </div>
    </form>
  );
}

export default ChatInput;
