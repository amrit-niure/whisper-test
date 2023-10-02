import { authOptions } from "@/lib/auth"
import connectionDB from "@/lib/db"
import User from "@/modal/userSchema"
import Room from "@/modal/roomSchema";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req,{params}){
    const session = await getServerSession(authOptions)
    if (!session) return new Response('Unauthorized', { status: 401 })
    const { id } = params
    await connectionDB()
    const user = await User.findById(id).populate("friends").populate("incoming_request").populate('groups')
    // const user = await User.findById(id)
    if (!user) return NextResponse.json({ message: 'NO user exists.' }, { status: 404 })
    // const friends = await User.find({ _id: { $in: user.friends } })
    return NextResponse.json( {user : user } , { status: 200 })
}