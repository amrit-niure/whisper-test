import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import { pusherServer } from "@/lib/pusherServer"
import User from "@/modal/userSchema"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { email } = await req.json()
    if (!email) {
        return new Response("Please provide an email address", { status: 400 })
    }

    const session = await getServerSession(authOptions)
    if (!session) {
        return new Response("Not Authorized", { status: 401 })
    }

    await connectionDB()

    // check if the req is sent to itself
    if (email === session.user.email) {
        let json_response = {
            status: "success",
            message: "You cannot send friend request to yourself"
        }
        return NextResponse.json(json_response, { status: 401 });
    }

    // check if the user exist or not 
    const user = await User.findOne({ email: email })
    if (!user) {
        let json_response = {
            status: "success",
            message: "User does not exist"
        }
        return NextResponse.json(json_response, { status: 401 });
    }

    // check if the req is already sent
    const requestedUser = await User.findById(user.id)
    if (requestedUser) {
        // check if the requested user id has your id in his incomming request array
        const alreadySentReq = requestedUser.incoming_request?.some((request) => request.toString() === session.user.id)
        if (alreadySentReq) {
            return NextResponse.json({ status: 'success', message: "Request already sent!" }, { status: 200 });
        }
    }


    // check if you already have requestedUsers request 
    const session_user = await User.findById(session.user.id)
    const alreadyHasReq = session_user.incoming_request?.some((request) => request.toString() === requestedUser._id.toString())
    if (alreadyHasReq) {
        return NextResponse.json({ status: 'success', message: `Your already have ${requestedUser.name} request!` }, { status: 401 });
    }


    // check if you both are already friends
    const alreadyFriends = session_user.friends?.some((friend) => friend.toString() === requestedUser._id.toString())
    if (alreadyFriends) {
        return NextResponse.json({ status: 'success', message: `Your are already friends with ${requestedUser.name} ` }, { status: 401 })
    }

    // implement realtime functionality here
    pusherServer.trigger("incoming-friend-request-channel", 'incoming-friend-request-event', {
        _id: session.user.id,
        name : session.user.name,  
        email : session.user.email  ,
        userId  : user._id
    })
    // implement realtime functionality here
    pusherServer.trigger("add-channel", 'add-event',{userId : user._id})

    // add the request to the requested user in database
    try {
        await User.findByIdAndUpdate(requestedUser._id, { $push: { incoming_request: session_user._id } }, { new: true, useFindAndModify: false })

    } catch (error) {
        console.log("Error While writing to databse", error)
    }
    return NextResponse.json({ status: 'success', message: `Request succesfully sent to  ${requestedUser.name}` }, { status: 200 });
}