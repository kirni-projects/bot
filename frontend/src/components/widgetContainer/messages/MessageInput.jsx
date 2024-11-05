// src/components/widgetContainer/messages/MessageInput.jsx
import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import PropTypes from 'prop-types';
import axios from 'axios';
import getSocket from './socket/getSocket';
import apiUrl from '../../../apiConfig'; // Import backend URL

const MessageInput = ({ userId, onNewMessage }) => {
  const [message, setMessage] = useState('');
  const socket = getSocket();

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await axios.post(`${apiUrl}/api/messages/${userId}`, { text: message }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Ensure you have token
          },
        });

        const newMessage = {
          sender: userId,
          text: message,
          createdAt: new Date().toISOString(),
        };

        // Emit the message to the server via WebSocket
        socket.emit('message', newMessage);

        // Update UI immediately before receiving from socket
        onNewMessage(newMessage);

        // Clear input field after sending the message
        setMessage('');
      } catch (err) {
        console.error('Error sending message:', err);
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

MessageInput.propTypes = {
  userId: PropTypes.string.isRequired,
  onNewMessage: PropTypes.func.isRequired,
};

export default MessageInput;
