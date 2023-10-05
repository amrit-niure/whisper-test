import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import Room from "@/modal/roomSchema"
import User from "@/modal/userSchema"

import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req) {
    const session = await getServerSession(authOptions)
    if (!session) return new Response('Unauthorized', { status: 401 })
    const { group, friend } = await req.json();

    try {
        await connectionDB()
        const rooms = await Room.find({ name: group });
        const user = await User.findOne({ email: friend });

        if (rooms.length === 0 || !user) {
            return NextResponse.json({ message: "Room or user not found" }, { status: 404 });
        }
        // check if the user is friend with the user whom he is inviting to join
        const isFriend = user.friends.includes(session.user.id);
        if (!isFriend) {
            return NextResponse.json({ message: `You are not friend with ${user.name}` }, { status: 400 })
        }
        // filter the exact room where the session user is the member from rooms list
        const room = rooms.filter((room) => room.members.some((id) => id.toString() === session.user.id))[0];

        // check if the user is already a member of the room
        const alreadyMember = room.members.some((id) => id.toString() === user._id.toString());
        if (alreadyMember) return NextResponse.json({ message:`${user.name} is already the member of this Group` }, { status: 401 })

        // check if the user is sending the group invitation to himself
        if (user.email === session.user.email) {
            return NextResponse.json({ message: "You cannot send invitation to yourself" }, { status: 400 });
        }
        //    check if the user is the member of the room 
        const isMember = room.members.some((id) => id.toString() === session.user.id)
        if (!isMember) return NextResponse.json({ message: 'You are not the member of this group.' }, { status: 401 })

        // check if the req is already sent
        if (user) {
            // check if the requested user id has your id in his incomming request array
            const alreadySentInv = user.group_invitation?.some((invitation) => invitation.toString() === room._id.toString())
            if (alreadySentInv) {
                return NextResponse.json({ status: 'success', message: "Invitation already sent!" }, { status: 200 });
            }
        }
        // create invitaiton if there is no previous invitation to the same group 
        user.group_invitation.push(room._id);
        await user.save();
        return NextResponse.json({ message: "Invitation sent successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error sending invitation:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }

}