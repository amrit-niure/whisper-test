import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import Chat from "@/modal/chatSchema"
import Message from "@/modal/messageSchema"
import User from "@/modal/userSchema"
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
    // first find the friend on the database
    const friend = await User.findById(id)
    const session_user = await User.findById(session.user.id)
    if (!friend) {
        return new Response("Friend does not exist", { status: 401 })
    }
    // check even both users are friends or not
    const areAlreadyFriends = session_user.friends.some(
        (friend) => friend._id.toString() === id
    );
    if (!areAlreadyFriends) {
        return NextResponse.json({ status: 'success', message: `Your both are not friends` }, { status: 401 });
    }

    // delete message between two users when unfriended and perform realtime functionality in sidebar to remove the friends by removing the friend form the friends state variable 

    try {
        // delete the friends of both user
        const updatedUser1 = await User.findByIdAndUpdate(
            session_user._id,
            { $pull: { friends: friend._id } },
            { new: true }
        );
        if (!updatedUser1) {
            return NextResponse.json({ message: "User Not found !" }, { status: 404 });
        }
        const updatedUser2 = await User.findByIdAndUpdate(
            friend._id,
            { $pull: { friends: session_user._id } },
            { new: true }
        );
        if (!updatedUser2) {
            return NextResponse.json({ message: "User Not found !" }, { status: 404 });
        }
       
        // Step 1: Find chat and get message IDs
        const chat = await Chat.findOne({
            participants: { $all: [session_user._id, friend._id] },
        });

        if (!chat) {
            console.log('Chat not found');
            return; // or handle accordingly
        }

        const messageIds = chat.messages;

        // Step 2: Delete messages
        const deletedMessages = await Message.deleteMany({
            _id: { $in: messageIds },
        });
        const deletedChat = await Chat.deleteOne({
            participants: { $all: [session_user._id, friend._id] },
        });

        // Check if the chat and messages were deleted successfully
        if (deletedChat.deletedCount === 1) {
            console.log('Chat deleted successfully');
        } else {
            console.log('Chat deletion failed');
        }

        if (deletedMessages.deletedCount > 0) {
            console.log(`${deletedMessages.deletedCount} messages deleted successfully`);
        } else {
            console.log('No messages deleted');
        }



        // after deleting the message trigger a event that will remove the friend in the sidebar section in realtime.
    } catch (error) {
        console.log("Error while making changes related to unfriend in database")
    }
    return NextResponse.json({ success: true, message: "Unfriend Task Completed" }, { status: 200 });
}