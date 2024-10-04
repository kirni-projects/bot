//models/conversation.model.js

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  messages: [messageSchema],
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;