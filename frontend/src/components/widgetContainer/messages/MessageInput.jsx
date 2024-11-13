// src/components/widgetContainer/messages/MessageInput.jsx
import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import axios from 'axios';
import getSocket from './socket/getSocket';
import apiUrl from '../../../apiConfig';

const MessageInput = ({ userId, onNewMessage }) => {
  const [message, setMessage] = useState('');
  const socket = getSocket();

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        const response = await axios.post(`${apiUrl}/api/messages/${userId}`, { text: message });
        
        if (response.status === 201) {
          const newMessage = { sender: userId, text: message, createdAt: new Date().toISOString() };
          onNewMessage(newMessage);
          setMessage('');
        } else {
          console.error('Failed to send message:', response);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    // Ensure that showMessageContainer stays true
    setShowMessageContainer(true);
  };

  return (
    <form className="message-input flex items-center" onSubmit={handleSubmit}>
      <input
        name="text"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">
        <BsSend />
      </button>
    </form>
  );
};

export default MessageInput;
