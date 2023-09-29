import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  emailVerified: Date,
  image: String,
  friends : [
    {type: Schema.Types.ObjectId, 
      ref: 'User' 
    }
  ],
  incoming_request : [
    {type: Schema.Types.ObjectId, 
      ref: 'User' 
    }
  ],
  groups : [
    {type: Schema.Types.ObjectId, 
      ref: 'Room' 
    }
  ],
  group_invitation : [
    {type: Schema.Types.ObjectId, 
      ref: 'Room' 
    }
  ],

});

const User =   mongoose.models.User ||  model('User', userSchema);

export default User;
