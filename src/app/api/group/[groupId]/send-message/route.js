import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import { pusherServer } from "@/lib/pusherServer"
import Message from "@/modal/messageSchema"
import Room from "@/modal/roomSchema"
import User from "@/modal/userSchema"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return new Response('Unauthorized', { status: 401 })
  const { groupId } = params
  console.log(groupId)
  const { text } = await req.json()
  await connectionDB()

  // Find the room  
  const room = await Room.findById(groupId);
  if (!room) {
    return NextResponse.json({ message: 'There is no room of this id' }, { status: 404 })
  }
  const sender = await User.findById(session.user.id)
  // check if the sender who is trying ot send the messsage is the member of the room or not
  const isMember = room.members.some((id) => id.toString() === session.user.id)
  if (!isMember) return NextResponse.json({ message: 'You are not the member of this group.' }, { status: 401 })

  // finally send the message 
  const msg = new Message({
    sender: sender._id,
    text: text,
  })
  pusherServer.trigger("group_message_channel", "group_message_event", {
    msg, grpId: groupId
  })

  try {
    await msg.save()
    // Push the message ID into the chat's messages array using findOneAndUpdate
    await Room.findByIdAndUpdate(groupId, { $push: { messages: msg._id } });

  } catch (error) {
    console.log("Error saving group message to database.", error)
  }

  return NextResponse.json({ message: 'Message Sent to group Succesfully' }, { status: 200 })

}