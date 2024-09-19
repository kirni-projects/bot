import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSend } from 'react-icons/bs';
import axios from 'axios';
import getSocket from './socket/getSocket';

const MessageInput = ({ userId, onNewMessage }) => {
  const [message, setMessage] = useState('');
  const socket = getSocket();

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        console.log('Sending message:', message);
        await axios.post(`/api/messages/${userId}`, { text: message });
        // No need to update state here, it will be updated via socket event
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
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        name="text"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button type="submit"><BsSend /></button>
    </form>
  );
};

MessageInput.propTypes = {
  userId: PropTypes.string.isRequired,
  onNewMessage: PropTypes.func.isRequired,
};

export default MessageInput;




// working import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { BsSend } from 'react-icons/bs';
// import axios from 'axios';

// const MessageInput = ({ userId, onNewMessage }) => {
//   const [message, setMessage] = useState('');

//   const sendMessage = async () => {
//     if (message.trim()) {
//       try {
//         console.log('Sending message:', message);
//         const response = await axios.post(`/api/messages/${userId}`, { text: message });
//         if (response.data.success) {
//           const newMessage = {
//             sender: userId,
//             profilePic: response.data.profilePic, // Assuming your backend returns profilePic
//             createdAt: new Date().toISOString(), // Assuming the backend response contains createdAt
//             text: message,
//           };
//           console.log('Message sent successfully:', newMessage);
//           onNewMessage(newMessage); // Update state with the new message
//         }
//         setMessage('');
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendMessage();
//   };

//   return (
//     <form className="message-input" onSubmit={handleSubmit}>
//       <input
//         name="text"
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button type="submit"><BsSend /></button>
//     </form>
//   );
// };

// MessageInput.propTypes = {
//   userId: PropTypes.string.isRequired,
//   onNewMessage: PropTypes.func.isRequired,
// };

// export default MessageInput;




// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { BsSend } from 'react-icons/bs';
// import axios from 'axios';
// const MessageInput = ({ userId, onNewMessage }) => {
//   const [message, setMessage] = useState('');

//   const sendMessage = async () => {
//     if (message.trim()) {
//       try {
//         console.log('Sending message:', message);
//         const response = await axios.post(`/api/messages/${userId}`, { text: message });
//         if (response.data.success) {
//           const newMessage = {
//             sender: userId,
//             profilePic: response.data.profilePic, // Assuming your backend returns profilePic
//             createdAt: new Date().toISOString(), // Assuming the backend response contains createdAt
//             text: message,
//           };
//           console.log('Message sent successfully:', newMessage);
//           onNewMessage(newMessage); // Update state with the new message
//         }
//         setMessage('');
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendMessage();
//   };

//   return (
//     <form className="message-input" onSubmit={handleSubmit}>
//       <input
//         name="text"
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button type="submit"><BsSend /></button>
//     </form>
//   );
// };

// MessageInput.propTypes = {
//   userId: PropTypes.string.isRequired,
//   onNewMessage: PropTypes.func.isRequired,
// };

// export default MessageInput;










// workingMessageInput.jsx to use Socket.IO:
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';

// const MessageInput = ({ userId, onNewMessage }) => {
//   const [message, setMessage] = useState('');

//   const sendMessage = async () => {
//     if (message.trim()) {
//       try {
//         const response = await axios.post(`/api/messages/${userId}`, { text: message });
//         if (response.data.success) {
//           const newMessage = {
//             sender: userId,
//             profilePic: response.data.profilePic, // Assuming your backend returns profilePic
//             createdAt: new Date().toISOString(), // Assuming the backend response contains createdAt
//             text: message,
//           };
//           onNewMessage(newMessage); // Update state with the new message
//         }
//         setMessage('');
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   return (
//     <div className="message-input">
//       <input
//         name="text"
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// MessageInput.propTypes = {
//   userId: PropTypes.string.isRequired,
//   onNewMessage: PropTypes.func.isRequired,
// };

// export default MessageInput;




// wokring proper
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';

// const MessageInput = ({ userId, onNewMessage }) => {
//   const [message, setMessage] = useState('');

//   const sendMessage = async () => {
//     if (message.trim()) {
//       try {
//         const response = await axios.post(`/api/messages/${userId}`, { text: message });
//         if (response.data.success) {
//           console.log('New message sent:', response.data.message); // Debugging line
//           onNewMessage(response.data.message); // Update conversation with the new message
//           setMessage('');
//         }
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   return (
//     <div className="message-input">
//       <input
//         name="message"
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// MessageInput.propTypes = {
//   userId: PropTypes.string.isRequired,
//   onNewMessage: PropTypes.func.isRequired,
// };

// export default MessageInput;











// import React, { useState } from 'react';
// import axios from 'axios';

// const MessageInput = ({ userId }) => {
//   const [message, setMessage] = useState('');

//   const sendMessage = async () => {
//     if (message.trim()) {
//       try {
//         await axios.post(`/api/messages/${userId}`, { text: message });
//         setMessage('');
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   return (
//     <div className="message-input">
//       <input
//         name="message"
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default MessageInput;
