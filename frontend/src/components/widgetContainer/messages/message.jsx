// src/components/widgetContainer/messages/message.jsx
import React, { useEffect, useState } from "react";
import getSocket from "./socket/getSocket";
import { useAuthContext } from "./AuthContext.jsx";
import Messages from "./messages.jsx";
import MessageInput from "./MessageInput.jsx";
import apiUrl from '../../../apiConfig';

const socket = getSocket();

const Message = () => {
  const { user } = useAuthContext();
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConversation = async () => {
    if (!user) {
      setError(new Error("User not authenticated"));
      return;
    }

    try {
      setLoading(true);
      const response = await get(`${apiUrl}/api/messages/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const conversationData = await response.json();
        setConversation(
          Array.isArray(conversationData.messages)
            ? conversationData.messages
            : []
        );
        setLoading(false);
      } else {
        console.error("Failed to fetch conversation data");
        setError(new Error("Failed to fetch conversation data"));
      }
    } catch (error) {
      console.error("Server error:", error);
      setError(error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchConversation();
      socket.emit("joinRoom", user._id); // Join the room based on user ID
  
      const handleMessage = (message) => {
        setConversation((prev) => [...prev, message]);
      };
  
      socket.on("message", handleMessage);
  
      return () => {
        socket.off("message", handleMessage);
      };
    }
  }, [user]);
  

  const handleNewMessage = (newMessage) => {
    socket.emit("message", newMessage); // Emit message to the server
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="card-header bg-orange-400 flex justify-between align-middle text-center items-center p-3">
        <div className="avatar items-center ">
          <div className="w-10 mr-3 border-solid border-opacity-100 border-2 rounded-full">
            <img src={user.profilePic} />
          </div>
          <span className="text-white text-lg font-semibold">{user.username}</span>
        </div>
      </div>
      <div className="card-body p-1">
        <Messages messages={conversation} />
      </div>
      <div className="card-footer">
        <MessageInput userId={user._id} onNewMessage={handleNewMessage} />
      </div>
    </>
  );
};

export default Message;