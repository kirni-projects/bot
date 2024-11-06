import React, { useEffect, useState } from "react";
import axios from 'axios';
import getSocket from "./socket/getSocket";
import { useAuthContext } from "./AuthContext.jsx";
import Messages from "./messages.jsx";
import MessageInput from "./MessageInput.jsx";
import apiUrl from '../../../apiConfig';

const socket = getSocket();

const Message = () => {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState([]);  // Store all messages here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages when the component mounts
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/messages/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setMessages(response.data.messages || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching conversation data:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchMessages();
      socket.emit("joinRoom", user._id); // Join room based on user ID
  
      // Listen for new messages from the server
      const handleMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]); // Update messages state
      };
  
      socket.on("message", handleMessage);
  
      return () => {
        socket.off("message", handleMessage);
      };
    }
  }, [user]);

  // Function to handle sending a new message
  const handleNewMessage = async (newMessageText) => {
    if (!newMessageText.trim()) return;

    try {
      // Add the user's message locally
      const newMessage = {
        sender: user._id,
        text: newMessageText,
        createdAt: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit the message to the server
      socket.emit("message", newMessage);

      // Send the message to the backend
      await axios.post(`${apiUrl}/api/messages/${user._id}`, { text: newMessageText });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="card-header bg-orange-400 flex justify-between align-middle text-center items-center p-3">
        <div className="avatar items-center ">
          <div className="w-10 mr-3 border-solid border-opacity-100 border-2 rounded-full">
            <img src={user.profilePic} alt="User profile" />
          </div>
          <span className="text-white text-lg font-semibold">{user.username}</span>
        </div>
      </div>
      <div className="card-body p-1">
        {/* Pass messages as a prop to the Messages component */}
        <Messages initialMessages={messages} />
      </div>
      <div className="card-footer">
        {/* Pass handleNewMessage to MessageInput */}
        <MessageInput onNewMessage={handleNewMessage} />
      </div>
    </>
  );
};

export default Message;
