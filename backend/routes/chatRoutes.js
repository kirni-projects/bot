import express from 'express';
import { startConversation, sendMessage, getMessages, getMe } from '../controllers/chatController.js';
import { protectRoute } from '../middleware/protectRoute.js'; // Assuming you have a middleware to protect routes

const router = express.Router();

router.post('/start-conversation', startConversation);
router.post('/messages/:userId', sendMessage);
router.get('/messages/:userId', getMessages);
router.get('/chat/me', protectRoute, getMe);
// router.post('/chat/logout', logoutUser);

export default router;