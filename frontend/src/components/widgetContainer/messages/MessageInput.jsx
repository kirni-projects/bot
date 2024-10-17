//src/components/widgetContainer/messages/MessageInput.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSend } from 'react-icons/bs';
import axios from 'axios';
import getSocket from './socket/getSocket';
import apiUrl from '../../../apiConfig.jsx'

const MessageInput = ({ userId, onNewMessage }) => {
  const [message, setMessage] = useState('');
  const socket = getSocket();

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        // Optionally, send the message to the server using HTTP if needed
        await axios.post(`${apiUrl}/messages/${userId}`, { text: message });

        const newMessage = {
          sender: userId,
          text: message,
          createdAt: new Date().toISOString(),
        };

        // Emit the message to the server via WebSocket
        socket.emit('message', newMessage);

        // Clear the input after sending the message
        setMessage('');
        onNewMessage(newMessage);  // Update local state in parent component if necessary
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













// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { BsSend } from 'react-icons/bs';
// import axios from 'axios';
// import getSocket from './socket/getSocket';
// import apiUrl from '../../../apiConfig.jsx'

// const MessageInput = ({ userId, onNewMessage }) => {
//   const [message, setMessage] = useState('');
//   const socket = getSocket();

//   const sendMessage = async () => {
//     if (message.trim()) {
//       try {
//         console.log('Sending message:', message);
//         await axios.post(`${apiUrl}/messages/${userId}`, { text: message });
//         // No need to update state here, it will be updated via socket event
//         setMessage('');
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }

//       const newMessage = {
//         sender: userId,
//         text: message,
//         createdAt: new Date().toISOString(),
//       };

//       // Emit the message to the server
//       socket.emit('message', newMessage);

//       // Optional: Update local UI (if necessary) before receiving the socket response
//       onNewMessage(newMessage);

//       // Clear the input after sending the message
//       setMessage('');
      
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendMessage();
//   };

//   return (
//     <form className="message-input flex items-center" onSubmit={handleSubmit}>
//     <input
//       name="text"
//       type="text"
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//       placeholder="Type a message"
//       className="w-full p-2 border border-gray-300 rounded-md"
//     />
//     <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">
//       <BsSend />
//     </button>
//   </form>
//     // <form className="message-input" onSubmit={handleSubmit}>
//     //   <input
//     //     name="text"
//     //     type="text"
//     //     value={message}
//     //     onChange={(e) => setMessage(e.target.value)}
//     //     placeholder="Type a message"
//     //   />
//     //   <button type="submit"><BsSend /></button>
//     // </form>
//   );
// };

// MessageInput.propTypes = {
//   userId: PropTypes.string.isRequired,
//   onNewMessage: PropTypes.func.isRequired,
// };

// export default MessageInput;