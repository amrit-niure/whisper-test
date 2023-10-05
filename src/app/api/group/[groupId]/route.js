import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import User from "@/modal/userSchema"
import Message from "@/modal/messageSchema"
import Room from "@/modal/roomSchema"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) return new Response('Unauthorized', { status: 401 })
    const { groupId } = params
    console.log(groupId)
    await connectionDB()

    // Find the room  
    const room = await Room.findById(groupId).populate('members').populate('messages')
    if (!room) {
        return NextResponse.json({ message: 'There is no room of this id' }, { status: 404 })
    }
    // check if the sender who is trying ot get the messsage is the member of the room or not
    const isMember = room.members.some((member) => member._id.toString() === session.user.id)
    if (!isMember) return NextResponse.json({ message: 'You are not the member of this group.' }, { status: 401 })

    return NextResponse.json({group: room}, { status: 200 })

}