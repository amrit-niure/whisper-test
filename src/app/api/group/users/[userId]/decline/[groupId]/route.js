import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import Room from "@/modal/roomSchema"
import User from "@/modal/userSchema"

import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) return new Response('Unauthorized', { status: 401 })
    const { userId, groupId } = params;
    try {
        await connectionDB()
        const room = await Room.findById(groupId);
        const user = await User.findById(userId);

        if (!room || !user) {
            return NextResponse.json({ message: "Room or user not found" }, { status: 404 });
        }
        //   check if there is any group invitation of this group id 
        const isGroupRequest = user.group_invitation.some(
            (req) => req.toString() === groupId
        );
        if (!isGroupRequest) {
            return NextResponse.json({ status: 'success', message: `You don't have invitation from this group` }, { status: 404 });
        }
        // Use $pull to remove the room from pending invitations
        await User.findByIdAndUpdate(userId, {
            $pull: { group_invitation: groupId },
        });
        return NextResponse.json({ message: "Invitation Declined successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error sending invitation:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }

}