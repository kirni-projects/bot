// controllers/chatController.js
import botUser from '../models/user.model.js';  // Use botUser instead of User
import Conversation from '../models/conversation.model.js';
import Notification from '../models/Notification.model.js';
import { v4 as uuidv4 } from 'uuid';
import { generateToken, setCookie } from '../utils/generateToken.js';

const generateBotResponse = (userMessage) => {
  const greetings = ['hello', 'hi', 'hey', 'greetings', 'salutations'];
  if (greetings.some(greeting => userMessage.toLowerCase().includes(greeting))) {
    return 'Hi there! How can I assist you today?';
  } else if (userMessage.toLowerCase().includes('help')) {
    return 'Sure, I am here to help you. Please tell me what you need assistance with.';
  } else {
    return 'I am not sure how to respond to that. Can you please rephrase your question or ask something else?';
  }
};

export const startConversation = async (req, res) => {
  const { username, message, eid } = req.body; // Include eid from the request

  try {
    const user = await botUser.findOne({ eid });
    if (!user) {
      return res.status(404).json({ error: 'User not found for this EID' });
    }

    const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;
    const newConversation = new Conversation({
      participants: [user._id],
      messages: [{ sender: user._id, text: message, createdAt: new Date() }]
    });
    await newConversation.save();

    const newNotification = new Notification({
      userId: user._id,
      userProfile: profilePic,
      title: 'New Chat Started',
      description: `${username} has started a conversation.`,
      type: 'chat'
    });
    await newNotification.save();

    const token = generateToken(user._id);
    setCookie(res, token);

    const io = req.app.locals.io;
    io.to(user._id.toString()).emit('message', { sender: user._id, text: message, createdAt: new Date() });

    res.status(201).json({
      _id: user._id,
      username: username,
      message: message,
      conversation: newConversation,
      profilePic: profilePic,
      usertoken: token
    });

    setTimeout(async () => {
      const botResponse = generateBotResponse(message);
      const botMessage = { sender: 'bot', text: botResponse, createdAt: new Date() };
      newConversation.messages.push(botMessage);
      await newConversation.save();
      
      io.to(user._id.toString()).emit('message', botMessage);
    }, 2000); 

  } catch (err) {
    res.status(500).json({ message: 'Failed to start conversation', error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
};

// Function to handle sending messages
export const sendMessage = async (req, res) => {
  const { userId } = req.params;
  const { text } = req.body;
  const io = req.app.locals.io; // Access io from app locals

  if (!userId || !text) {
    console.error('UserId or text missing from request');
    return res.status(400).json({ message: 'UserId or text missing from request' });
  }

  try {
    // Find or create a conversation with the user
    let conversation = await Conversation.findOne({ participants: userId });

    if (!conversation) {
      // If no conversation exists, create a new one
      conversation = new Conversation({ participants: [userId], messages: [] });
    }

    // Add the new message from the user to the conversation
    conversation.messages.push({ sender: userId, text, createdAt: new Date() });

    // Save the conversation before generating a bot response
    await conversation.save();

    // Emit the user message to the client's room
    io.to(userId).emit('message', { sender: userId, text, createdAt: new Date() });

    // Generate and send the bot response after a delay
    setTimeout(async () => {
      const botResponse = generateBotResponse(text);
      conversation.messages.push({ sender: 'bot', text: botResponse, createdAt: new Date() });
      await conversation.save();
      
      // Emit the bot message to the client's room
      io.to(userId).emit('message', { sender: 'bot', text: botResponse, createdAt: new Date() });
    }, 2000); // Delay of 2 seconds (adjust as needed)

    res.status(201).json({ success: true, conversation, message: 'Message sent' });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

// Function to get all messages for a user
export const getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversation = await Conversation.findOne({ participants: userId }).populate('messages.sender', 'username profilePic');
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.status(200).json({ messages: conversation.messages });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get messages', error: err.message });
  }
};
