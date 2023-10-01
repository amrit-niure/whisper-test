"use client"
import React, { useRef, useState } from 'react';
import { Image, Paperclip, SendHorizontal } from 'lucide-react';
import { HiOutlineGif } from 'react-icons/hi2';
import ReactTextareaAutosize from 'react-textarea-autosize';

const ChatInput = () => {
  const textareaRef = useRef(null);
  const [input, setInput] = useState("");

  return (
    <form encType="multipart/form-data">
      <div className='flex w-full items-center gap-4 text-primary'>
        <Paperclip className='cursor-pointer' />
        <Image size={26} className='cursor-pointer' />
        <HiOutlineGif className='text-3xl cursor-pointer' />
        {/* <input
          type="text"
          placeholder='Type a message'
          className='w-full h-8 px-2 outline-none bg-light_bg_chat rounded-full'
        /> */}
         <ReactTextareaAutosize
          ref={textareaRef}
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
        <button type='submit'>   <SendHorizontal size={28} className='cursor-pointer' /> </button>
      </div>
    </form>
  );
}

export default ChatInput;
