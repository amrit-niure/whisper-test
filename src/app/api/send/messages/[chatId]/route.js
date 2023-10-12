import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import { pusherServer } from "@/lib/pusherServer"
import Chat from "@/modal/chatSchema"
import Message from "@/modal/messageSchema"
import User from "@/modal/userSchema"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return new Response('Unauthorized', { status: 401 })

  const { text, recipientId } = await req.json()
  const { chatId } = params

  // check if the same user is trying to send message to itself 
  if (recipientId === session.user.id) return NextResponse.json({ msg: "You cannot send message to yourself" }, { status: 400 })

  const [userId1, userId2] = chatId.split('--')
  // check in the url that one of the id is the id of session user 
  if (session.user.id !== userId1 && session.user.id !== userId2) {
    return new Response('Unauthorized User Id', { status: 401 })
  }
  await connectionDB()
  // check if the sender even exist
  const sender = await User.findById(session.user.id)
  // check if the receiver even exist
  const recipient = await User.findById(recipientId)
  if (!recipient) return NextResponse.json({ message: 'NO user exists.' }, { status: 404 })

  //  check if the user who is sending the message is friend with the receiver or not 
  const isFriend = recipient.friends.some((id) => id.toString() === sender._id.toString())
  if (!isFriend) return NextResponse.json({ message: 'You both are not friends with each other.' }, { status: 401 })

  // Find the chat ID based on participants
  const chat = await Chat.findOne({
    participants: {
      $all: [userId1, userId2],
    },
  });

  if (!chat) {
    // Create a new chat if it doesn't exist
    const newChat = new Chat({
      participants: [userId1, userId2],
      messages: [],
    });
    await newChat.save();
  }

  // finally send the message 
  const msg = new Message({
    sender: sender._id,
    text: text,
  })

  if(chatId === `${recipientId}--${sender._id}` || `${sender._id}--${recipientId}`){
  pusherServer.trigger("message_channel", "message_event", {
    msg, prevChatId: chatId
  })
}

  try {

    await msg.save()
    // Push the message ID into the chat's messages array using findOneAndUpdate
    await Chat.findOneAndUpdate(
      {
        participants: {
          $all: [userId1, userId2],
        },
      },
      { $push: { messages: msg._id } }
    );

  } catch (error) {
    console.log("Error saving message to database.", error)
  }

  return NextResponse.json({ message: 'Message Sent Succesfully' }, { status: 200 })

}