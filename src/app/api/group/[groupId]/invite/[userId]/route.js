import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import Room from "@/modal/roomSchema"
import User from "@/modal/userSchema"

import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) return new Response('Unauthorized', { status: 401 })
    const { groupId, userId } = params;
    try {
        await connectionDB()
        const room = await Room.findById(groupId);
        const user = await User.findById(userId);

        if (!room || !user) {
            return NextResponse.json({ message: "Room or user not found" },{status : 404});
        }
           // check if the req is already sent
    if (user) {
        // check if the requested user id has your id in his incomming request array
        const alreadySentInv = user.group_invitation?.some((invitation) => invitation.toString() === groupId)
        if (alreadySentInv) {
            return NextResponse.json({ status: 'success', message: "Invitation already sent!" }, { status: 200 });
        }
    }
        // create invitaiton if there is no previous invitation to the same group 
        user.group_invitation.push(groupId);
        await user.save();
        return NextResponse.json({ message: "Invitation sent successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error sending invitation:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }

}