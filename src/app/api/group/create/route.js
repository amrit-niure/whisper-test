import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import Room from "@/modal/roomSchema"
import User from "@/modal/userSchema"

import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req,){
    const session = await getServerSession(authOptions)
    if (!session) return new Response('Unauthorized', { status: 401 })
    const {name} = await req.json()
  // check if the creator of room even exist in our database
  const creator = await User.findById(session.user.id)
  if (!creator) return NextResponse.json({ message: 'No user exists.Group Creation Failed.' }, { status: 404 })
// Create a new room with a name and empty members and messages array
const newRoom = new Room({
    name: name,
    members: [creator._id],
    messages: []
  });
  try {
    await connectionDB()
    await newRoom.save()
  // Update the creator's user document to include the new room in their rooms array
  creator.groups.push(newRoom._id);
  await creator.save();
  } catch (error) {
    console.log("Error While saving to database.")
  }
    return NextResponse.json( {msg : "New room created succesfully" ,data : newRoom } , { status: 200 })
}