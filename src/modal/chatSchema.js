import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Messages' 
  }]
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

export default Chat
