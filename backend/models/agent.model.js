//models/agent.model.js
import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: ""
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  socketId: {
    type: String
  }
});

export default mongoose.model('Agent', agentSchema);