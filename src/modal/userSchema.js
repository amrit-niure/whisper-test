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
      ref: 'Users' 
    }
  ],
  incoming_request : [
    {type: Schema.Types.ObjectId, 
      ref: 'Users' 
    }
  ],

});

const User =   mongoose.models.User ||  model('User', userSchema);

export default User;
