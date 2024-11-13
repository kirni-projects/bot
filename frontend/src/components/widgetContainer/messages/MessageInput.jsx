// src/components/widgetContainer/messages/MessageInput.jsx
import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import axios from 'axios';
import getSocket from './socket/getSocket'; // Assuming this initializes socket connection

const MessageInput = ({ userId, onNewMessage }) => {
  const [message, setMessage] = useState('');
  const socket = getSocket();

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        // Send message to the backend
        const response = await axios.post(`/api/messages/${userId}`, { text: message });
        
        // Check if the response was successful
        if (response.status === 201 || response.status === 200) {
          // Prepare the message object
          const newMessage = {
            sender: userId,
            text: message,
            createdAt: new Date().toISOString(),
          };

          // Emit message over socket (optional if using socket)
          socket.emit('message', newMessage);

          // Clear the message input field
          setMessage('');

          // Pass the new message to the parent component
          onNewMessage(newMessage);
        } else {
          console.error('Failed to send message:', response);
        }
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(); // Call send message when form is submitted
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





// working but showing 3 chatbubble at 1 time import React, { useState } from 'react';
// import { BsSend } from 'react-icons/bs';
// import axios from 'axios';
// import apiUrl from '../../../apiConfig';

// const MessageInput = ({ userId, onNewMessage }) => {
//   const [message, setMessage] = useState('');

//   const sendMessage = async () => {
//     if (message.trim()) {
//       try {
//         const response = await axios.post(`${apiUrl}/api/messages/${userId}`, { text: message });
        
//         if (response.status === 201) {
//           // Notify the parent component of the new message
//           onNewMessage(message);
//           setMessage(''); // Clear input after sending
//         } else {
//           console.error('Failed to send message:', response);
//         }
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendMessage();
//   };

//   return (
//     <form className="message-input flex items-center" onSubmit={handleSubmit}>
//       <input
//         name="text"
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//         className="w-full p-2 border border-gray-300 rounded-md"
//       />
//       <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">
//         <BsSend />
//       </button>
//     </form>
//   );
// };

// export default MessageInput;

