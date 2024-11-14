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
    return 'I am not sure how to respond to that. An agent will be with you shortly. Please hold on for a moment.';
  }
};

export const startConversation = async (req, res) => {
  const { username, message, eid } = req.body;

  try {
    // Find the user by 'username' and 'eid'
    let user = await botUser.findOne({ username, eid });

    // If user exists and is active (within 24 hours), update lastActive and proceed with the existing conversation
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (user && user.lastActive > twentyFourHoursAgo) {
      // Update lastActive to keep user active
      user.lastActive = new Date();
      await user.save();
    } else {
      // If user is inactive (or doesn't exist), recreate the user and start a new conversation
      if (!user) {
        user = new botUser({
          username,
          message,
          eid,
          profilePic: `${process.env.PRODUCTION_URL}/api/avatar?username=${encodeURIComponent(username)}`,
          lastActive: new Date() // Set lastActive to current time
        });
        await user.save();
      } else {
        // User exists but is inactive; reset lastActive and delete previous data
        user.lastActive = new Date();
        await user.save();

        // Clear old conversation if any
        await Conversation.deleteOne({ participants: user._id });
      }
    }

    const profilePic = user.profilePic;

    // Find an existing conversation or create a new one
    let conversation = await Conversation.findOne({ participants: user._id });
    if (!conversation) {
      conversation = new Conversation({
        participants: [user._id],
        messages: [{ sender: user._id, text: message, createdAt: new Date() }]
      });
      await conversation.save();
    } else {
      // If continuing the conversation, add the new message
      conversation.messages.push({ sender: user._id, text: message, createdAt: new Date() });
      await conversation.save();
    }

    // Create a new notification for starting/continuing a chat
    const newNotification = new Notification({
      userId: user._id,
      userProfile: profilePic,
      title: 'New Chat Started',
      description: `${username} has started or continued a conversation.`,
      type: 'chat'
    });
    await newNotification.save();

    // Generate token and set cookie
    const token = generateToken(user._id);
    setCookie(res, token);

    // Emit initial message to user's socket room
    const io = req.app.locals.io;
    io.to(user._id.toString()).emit('message', { sender: user._id, text: message, createdAt: new Date() });

    res.status(201).json({
      _id: user._id,
      username: username,
      message: message,
      conversation,
      profilePic: profilePic,
      usertoken: token
    });

    // Send a bot response after a delay
    setTimeout(async () => {
      const botResponse = generateBotResponse(message);
      const botMessage = { sender: 'bot', text: botResponse, createdAt: new Date() };
      conversation.messages.push(botMessage);
      await conversation.save();

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
  const io = req.app.locals.io;

  if (!userId || !text) {
    return res.status(400).json({ message: 'UserId or text missing from request' });
  }

  try {
    // Find or create the conversation
    let conversation = await Conversation.findOne({ participants: userId });
    if (!conversation) {
      conversation = new Conversation({ participants: [userId], messages: [] });
    }

    // Create the new message and update conversation
    const newMessage = { sender: userId, text, createdAt: new Date() };
    conversation.messages.push(newMessage);
    await conversation.save();

    // Emit the message to the user's socket room
    io.to(userId).emit('message', newMessage);

    // Update the botUser's `lastActive` timestamp to keep them active
    await botUser.findByIdAndUpdate(userId, { lastActive: new Date() });

    // Bot response after a delay
    setTimeout(async () => {
      const botResponse = generateBotResponse(text);
      const botMessage = { sender: 'bot', text: botResponse, createdAt: new Date() };
      conversation.messages.push(botMessage);
      await conversation.save();

      io.to(userId).emit('message', botMessage);
    }, 2000);

    res.status(201).json({ success: true, conversation, message: 'Message sent' });
  } catch (err) {
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