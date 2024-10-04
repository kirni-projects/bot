// models/user.model.js
import mongoose from "mongoose";

// Define the botUser schema
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
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        default: null
    },
    isAccepted: { 
        type: Boolean, 
        default: false 
    }, // Add an 'isAccepted' field
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// Avoid model overwrite error: only compile if not already compiled
const botUser = mongoose.models.botUser || mongoose.model("botUser", userSchema);

export default botUser;