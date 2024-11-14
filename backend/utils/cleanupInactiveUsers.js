import botUser from '../models/user.model.js';
import Conversation from '../models/conversation.model.js';
import Notification from '../models/Notification.model.js';
import cron from 'node-cron';

const deleteInactiveUsers = async () => {
  try {
    const inactiveThreshold = new Date(Date.now() - 1 * 60 * 1000); // Inactive for 1 minute (for testing)
    // const inactiveThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    // Find users who haven't been active for over 24 hours
    const inactiveUsers = await botUser.find({ lastActive: { $lt: inactiveThreshold } });

    const userIds = inactiveUsers.map(user => user._id);

    // Delete associated conversations
    await Conversation.deleteMany({ participants: { $in: userIds } });

    // Delete associated notifications
    await Notification.deleteMany({ userId: { $in: userIds } });

    // Delete inactive users
    await botUser.deleteMany({ _id: { $in: userIds } });

    console.log(`Deleted ${userIds.length} inactive users and their associated data.`);
  } catch (err) {
    console.error("Failed to delete inactive users:", err);
  }
};

// Schedule the cleanup job to run every hour
cron.schedule('0 * * * *', deleteInactiveUsers);

export default deleteInactiveUsers;
