import Message from "@/modal/messageSchema"

export async function POST(req){
    const session = await getServerSession(authOptions)
    if (!session) return new Response('Unauthorized', { status: 401 })

    const {text, recipientId, chatId} = await req.json()

      // check if the same user is trying to send message to itself 
  if (recipientId === session.user.id) return NextResponse.json({ msg: "You cannot send message to yourself" }, { status: 400 })

  const [userId1, userId2] = chatId.split('--')
  if (session.user.id !== userId1 && session.user.id !== userId2) {
    return new Response('Unauthorized',{ status: 401 })
  }

   // check if the sender even exist
   const sender = await Users.findById(session.user.id)
   const recipient = await Users.findById(recipientId)

   if (!recipient) return NextResponse.json({ message: 'NO user exists.' }, { status: 404 })

   // check if the user who is sending the message is friend with the receiver or not 
   const isFriend = recipient.friends.some((id) => id.toString() === sender._id.toString())
   if (!isFriend) return NextResponse.json({ message: 'You both are not friends with each other.' }, { status: 404 })
   // finally send the message 

   const msg = new Message({
    sender : sender._id,
    text : text,
    
   })
}