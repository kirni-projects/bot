import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.Mixed, required: true }, // Allows both ObjectId and string
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  messages: [messageSchema],
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;