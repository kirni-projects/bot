// src/components/widgetContainer/messages/Messages.jsx
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from './AuthContext.jsx';
import getSocket from '../messages/socket/getSocket.jsx';  
import apiUrl from '../../../apiConfig'; // Import the backend URL

const Messages = ({ initialMessages }) => {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState(initialMessages || []);  // Use state for messages
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();  // Scroll when the messages change
  }, [messages]);

  // Fetch messages from the server using apiUrl
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/messages/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchMessages();
      const socket = getSocket();

      // Listen for 'message' events from the server
      socket.on('message', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);  // Append the new message
      });

      // Cleanup on unmount
      return () => {
        socket.off('message');  // Stop listening for messages when the component unmounts
      };
    }
  }, [user]);

  return (
    <div className="messages-container p-3">
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`flex chat gap-0 ${
              msg.sender === user._id ? 'justify-end chat-end' : 'justify-start chat-start'
            } mb-3`}
          >
            {msg.sender !== user._id && (
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={
                      msg.sender === 'bot'
                        ? 'https://avatar.iran.liara.run/username?username=bot'
                        : 'default-profile.png'
                    }
                  />
                </div>
              </div>
            )}
            <div className={`ml-3 ${msg.sender === user._id ? 'order-1 text-right' : 'order-none'}`}>
              <div className="chat-header">
                <span className="chat-sender font-semibold">
                  {msg.sender === user._id ? 'You' : msg.sender === 'bot' ? 'Bot' : 'Other'}
                </span>
              </div>
              <div
                className={`chat-bubble ${
                  msg.sender === user._id ? 'bg-blue-200 float-right' : 'bg-gray-400'
                } p-2 text-black rounded-lg`}
              >
                {msg.text}
              </div>
            </div>
            {msg.sender === user._id && (
              <div className="chat-image avatar ml-3 order-2">
                <div className="w-10 rounded-full">
                  <img alt="Profile" src={user.profilePic} />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="no-messages text-center text-gray-500 mt-3">No messages yet</div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

Messages.propTypes = {
  initialMessages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      profilePic: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Messages;




// //src/components/widgetContainer/messages/messages.jsx
// import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import { useAuthContext } from './AuthContext.jsx';

// const Messages = ({ messages }) => {
//   const { user } = useAuthContext();
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <div className="messages-container p-3">
//       {messages.length > 0 ? (
//         messages.map((msg, index) => (
//           <div 
//             key={index} 
//             className={`flex chat gap-0 ${msg.sender === user._id ? 'justify-end chat-end' : 'justify-start chat-start'} mb-3`}
//           >
//             {msg.sender !== user._id && (
//               <div className="chat-image avatar">
//                 <div className="w-10 rounded-full">
//                   <img 
//                     alt="Profile" 
//                     src={msg.sender === 'bot' 
//                       ? 'https://avatar.iran.liara.run/username?username=bot' 
//                       : 'default-profile.png'} 
//                   />
//                 </div>
//               </div>
//             )}
//             <div className={`ml-3 ${msg.sender === user._id ? 'order-1 text-right' : 'order-none'}`}>
//               <div className="chat-header">
//                 <span className="chat-sender font-semibold">
//                   {msg.sender === user._id ? 'You' : (msg.sender === 'bot' ? 'Bot' : 'Other')}
//                 </span>
//               </div>
//               <div className={`chat-bubble ${msg.sender === user._id ? 'bg-blue-200 float-right' : 'bg-gray-400'} p-2 text-black rounded-lg`}>
//                 {msg.text}
//               </div>
//             </div>
//             {msg.sender === user._id && (
//               <div className="chat-image avatar ml-3 order-2">
//                 <div className="w-10 rounded-full">
//                   <img alt="Profile" src={user.profilePic} />
//                 </div>
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <div className="no-messages text-center text-gray-500 mt-3">No messages yet</div>
//       )}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// Messages.propTypes = {
//   messages: PropTypes.arrayOf(
//     PropTypes.shape({
//       sender: PropTypes.string.isRequired,
//       text: PropTypes.string.isRequired,
//       profilePic: PropTypes.string,
//       createdAt: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// export default Messages; 