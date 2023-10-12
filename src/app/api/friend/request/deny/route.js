import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import { pusherServer } from "@/lib/pusherServer"
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
    const session_user = await User.findById(session.user.id)
    const friend = await User.findById(id)
    if (!friend) {
        // delete the incoming request of the sender if the sender has deleted the account after sending the req
        const updatedUser = await User.findByIdAndUpdate(
            session_user._id,
            { $pull: { incoming_request: id } },
            { new: true }
        );
        if (!updatedUser) {
            return NextResponse.json({ message: "User Not found!" }, { status: 404 });
        }
        return new Response("User does not exists. (User may have deleted his account after sending you request.)", { status: 404 })
    }
    // check if there is incomming request 
    const isIncomingRequest = session_user.incoming_request.some(
        (req) => req.toString() === id
    );
    if (!isIncomingRequest) {
        return NextResponse.json({ status: 'success', message: `You No longer have request of this user.` }, { status: 404 });
    }

    // realtime
    pusherServer.trigger("accept-deny-channel", 'accept-deny-event', {})


    try {
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
        console.log("Error while deleting the request")
    }
    return NextResponse.json({ status: 'success', message: `Request Denied Succesfully.` }, { status: 200 });
}