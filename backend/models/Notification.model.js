//models/Notification.model.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userProfile: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  isUnRead: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", notificationSchema);