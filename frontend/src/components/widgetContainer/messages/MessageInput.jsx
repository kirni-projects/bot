// src/components/widgetContainer/messages/MessageInput.jsx
import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import axios from 'axios';
import apiUrl from '../../../apiConfig';

const MessageInput = ({ userId, onNewMessage }) => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        const response = await axios.post(`${apiUrl}/api/messages/${userId}`, { text: message });
        
        if (response.status === 201) {
          onNewMessage(message); // Call once after message is successfully sent
          setMessage(''); // Clear input after sending
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

