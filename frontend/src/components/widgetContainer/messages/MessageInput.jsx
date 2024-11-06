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
        
        if (response.status === 201 || response.status === 200) {
          const newMessage = {
            sender: userId,
            text: message,
            createdAt: new Date().toISOString(),
          };

          socket.emit('message', newMessage);
          setMessage('');
          onNewMessage(newMessage);
        } else {
          console.error('Failed to send message:', response);
          alert('Failed to send message. Please try again.');
        }
      } catch (err) {
        console.error('Error sending message:', err);
        alert('Network error. Please check your connection.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
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
