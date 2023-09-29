import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import Room from "@/modal/roomSchema"
import User from "@/modal/userSchema"

import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
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

        // Check if the user is a member of the room
        const isMemberOfRoom = room.members.includes(userId);

        // Check if the user's groups array contains the room ID
        const isUserInGroup = user.groups.includes(groupId);

        if (!isMemberOfRoom || !isUserInGroup) {
            return NextResponse.json({ message: "User is not in the room or group" }, { status: 400 })
        }

        // Remove the user from the room's members
        room.members = room.members.filter(
            (memberId) => memberId.toString() !== userId
        );

        // Remove the room from the user's groups
        user.groups = user.groups.filter(
            (groupId) => groupId.toString() !== groupId
        );

        // Save both the user and the room
        await user.save();
        await room.save();


        // // Use $pull to remove the group from pending groups array of user 
        // await User.findByIdAndUpdate(userId, {
        //     $pull: { groups: groupId },
        // });
        return NextResponse.json({ message: "Group Leaved successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error sending invitation:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }

}