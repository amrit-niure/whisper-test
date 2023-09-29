import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import Chat from "@/modal/chatSchema"
import Message from "@/modal/messageSchema"

import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req,{params}){
    const session = await getServerSession(authOptions)
    if (!session) return new Response('Unauthorized', { status: 401 })
    const { chatId } = params
    const [userId1, userId2] = chatId.split('--')

    await connectionDB()
    
      // Find the chat ID based on participants
  const chat = await Chat.findOne({
    participants: {
      $all: [userId1, userId2],
    },
  }).populate("messages");
    return NextResponse.json( chat.messages , { status: 200 })
}