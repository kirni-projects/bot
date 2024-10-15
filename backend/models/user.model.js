// models/user.model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Ensure the username is unique
  },
  message: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: ""
  },
  uniqueChatId: {
    type: String,
    default: ""
  },
  eid: {  // Add eid here to track the domain URL
    type: String,
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    default: null
  },
  isAccepted: { 
    type: Boolean, 
    default: false 
  },
  profilePic: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const botUser = mongoose.models.botUser || mongoose.model("botUser", userSchema);
export default botUser;
