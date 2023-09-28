import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import Chat from "@/modal/chatSchema"
import User from "@/modal/userSchema"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req) {

    const { id } = await req.json()

    if (!id) {
        return new Response("Please provide an id", { status: 400 })
    }
    const session = await getServerSession(authOptions)
    if (!session) {
        return new Response("Not Authorized", { status: 401 })
    }
    await connectionDB()
    // check if there is incomming request 
    const session_user = await User.findById(session.user.id)
    const isIncomingRequest = session_user.incoming_request.some(
        (req) => req.toString() === id
    );
    if (!isIncomingRequest) {
        return NextResponse.json({ status: 'success', message: `You No longer have request of this user.` }, { status: 404 });
    }
    // // first find the friend on the database
    const friend = await User.findById(id)
    if (!friend) {
        // delete the incoming request of the sender if the sender has deleted the account after sending the req
        const updatedUser = await User.findByIdAndUpdate(
            session_user._id,
            { $pull: { incoming_request: id } },
            { new: true }
        );
        if (!updatedUser) {
            return NextResponse.json({ message: "User Not found !" }, { status: 404 });
        }
        return new Response("Friend does not exist", { status: 401 })
    }
    // check if they are already friends
    const areAlreadyFriends = session_user.friends.some(
        (friend) => friend._id.toString() === id
    );
    if (areAlreadyFriends) {
        return NextResponse.json({ status: 'success', message: `Your both are already friends` }, { status: 200 });
    }

    try {
    // Create a new chat document with both participants
    const chat = new Chat({
        participants: [session_user._id, friend._id],
        messages: [], // Initialize with an empty message array
      });
  
      await chat.save();
  
      // Update the friends list for both users
        await User.findByIdAndUpdate(
            session_user._id,
            { $push: { friends: id} },
            { new: true, useFindAndModify: false }
        )
        await User.findByIdAndUpdate(
            friend._id,
            { $push: { friends: session_user._id } },
            { new: true, useFindAndModify: false }
        )
        // delete the incoming request of the sender after accepting the request
        const updatedUser = await User.findByIdAndUpdate(
            session_user._id,
            { $pull: { incoming_request: friend._id } },
            { new: true }
        );
        if (!updatedUser) {
            return NextResponse.json({ message: "User Not found !" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Error while writing to database",error }, { status: 500 });
      
    }

    return NextResponse.json({ success: true, message: "Friend Request Accepted Succesfully" }, { status: 200 });
}  