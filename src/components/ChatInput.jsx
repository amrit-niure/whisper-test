'use client'
import React, { useState } from 'react';
import { Image, Paperclip, SendHorizontal } from 'lucide-react';
import { HiOutlineGif } from 'react-icons/hi2';
import ReactTextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ChatInput = ({ chatId, recipientId, groupId, senderId }) => {
  const [isSending, setIsSending] = useState(false);
  const [input, setInput] = useState('');


  const sendMessage = async () => {
    try {
      if (!input || isSending) return;
      setIsSending(true);
      let promise;
      if (chatId) {
        promise = axios.post(`/api/send/messages/${chatId}`, { text: input, recipientId: recipientId });
      } else {
        promise = axios.post(`/api/group/${groupId}/send-message`, { text: input, sender: senderId });
      }

      toast.promise(
        promise,  
        {
          loading: 'Sending...',
       success : "Sent",
          error: (err) => {
            toast.error(err.response?.data?.message || 'Something went wrong. Please try again later.');
            return err.response?.data?.message || 'Something went wrong. Please try again later.';
          },
        },
        {
          duration : 1000
        }
      );

      setInput('');
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      setInput('')
    }
  };

  return (
    <div>
     
    <form encType="multipart/form-data">
      <div className="flex w-full items-center gap-4 text-primary">

        <Paperclip className="cursor-pointer" />
        <Image size={26} className="cursor-pointer" />
        <HiOutlineGif className="text-3xl cursor-pointer" />
        <ReactTextareaAutosize
          onKeyDown={handleKeyDown}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Type a message`}
          className="block w-full resize-none h-8 px-2 outline-none bg-light_bg_chat rounded-lg text-black border-2 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />
        <button type="submit" disabled={isSending} onClick={sendMessage}>
          <SendHorizontal size={28} className="cursor-pointer" />
        </button>
      </div>
    </form>
    </div>
  );
};

export default ChatInput;
