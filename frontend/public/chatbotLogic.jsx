// // frontend/src/chatbotLogic.jsx

// frontend/src/chatbotLogic.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'; // Ensure you import ReactDOM to mount the component
import axios from "axios";
import { BsSend } from "react-icons/bs"; // Send icon
import getSocket from "./widgetContainer/messages/socket/getSocket"; // Socket utility for real-time chat

const socket = getSocket();

const ChatbotLogic = ({ eid }) => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [avatarAnimation, setAvatarAnimation] = useState('rotate-in'); // Manage avatar animation state
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = 'https://bot-rd1k.onrender.com'; // Live API URL

  useEffect(() => {
    if (eid) {
      fetchConversation(eid);
    }

    socket.on("message", (newMessage) => {
      setConversation((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, [eid]);

  const fetchConversation = async (eid) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiUrl}/api/messages/${eid}`);
      setConversation(response.data.messages || []);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to load messages.");
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!username || !message) {
      setError("Please provide both a name and a message.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/start-conversation`, {
        username,
        message,
        eid,
      });

      const { conversation: newConversation } = response.data;
      setConversation(newConversation.messages);
      setMessage("");

      socket.emit("message", { sender: username, text: message });

      setError(null);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message.");
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setAvatarAnimation(isChatOpen ? 'rotate-in' : 'rotate-out'); // Toggle animation based on state
  };

  return (
    <div className="chatbot-widget">
      <div className={`chatbot-toggle ${isChatOpen ? "open" : ""}`}>
        <button className="chat-toggle-btn" onClick={toggleChat}>
          <div className={`chat-avatar ${avatarAnimation}`}>
            <img
              src="https://bot-rd1k.onrender.com/assets/icons/sms.png"
              alt="Chat"
            />
          </div>
        </button>
      </div>

      {isChatOpen && (
        <div className="chatbot-container">
          <div className="chat-header">
            <h2>Chat with us</h2>
            <button className="chat-close-btn" onClick={toggleChat}>
              ✕
            </button>
          </div>

          <div className="chat-body">
            {isLoading ? (
              <p>Loading conversation...</p>
            ) : (
              <div className="chat-messages">
                {conversation.length > 0 ? (
                  conversation.map((msg, index) => (
                    <div key={index} className="message">
                      <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                  ))
                ) : (
                  <p>No messages yet. Start the conversation!</p>
                )}
                {error && <p className="error">{error}</p>}
              </div>
            )}
          </div>

          <form className="chat-footer" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
            <textarea
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea"
              required
            ></textarea>
            <button type="submit" className="send-btn">
              <BsSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Mount the chatbot widget into the container
const widgetContainer = document.getElementById('chat-widget-container');
if (widgetContainer) {
  ReactDOM.render(<ChatbotLogic />, widgetContainer);
}

export default ChatbotLogic;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BsSend } from "react-icons/bs"; // Send icon
// import getSocket from "../src/components/widgetContainer/messages/socket/getSocket"; // Socket utility for real-time chat

// const socket = getSocket();

// const ChatbotLogic = ({ eid }) => {
//   const [username, setUsername] = useState("");
//   const [message, setMessage] = useState("");
//   const [conversation, setConversation] = useState([]);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const apiUrl = 'https://bot-rd1k.onrender.com'; // Live API URL

//   // Fetch previous messages when the component is mounted
//   useEffect(() => {
//     if (eid) {
//       fetchConversation(eid);
//     }

//     socket.on("message", (newMessage) => {
//       setConversation((prev) => [...prev, newMessage]);
//     });

//     return () => {
//       socket.off("message");
//     };
//   }, [eid]);

//   const fetchConversation = async (eid) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`${apiUrl}/api/messages/${eid}`);
//       setConversation(response.data.messages || []);
//       setIsLoading(false);
//     } catch (error) {
//       setError("Failed to load messages.");
//       setIsLoading(false);
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();

//     if (!username || !message) {
//       setError("Please provide both a name and a message.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${apiUrl}/api/start-conversation`, {
//         username,
//         message,
//         eid,
//       });

//       const { conversation: newConversation } = response.data;
//       setConversation(newConversation.messages);
//       setMessage("");

//       socket.emit("message", { sender: username, text: message });

//       setError(null);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setError("Failed to send message.");
//     }
//   };

//   const toggleChat = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   return (
//     <div className="chatbot-widget">
//       <div className={`chatbot-toggle ${isChatOpen ? "open" : ""}`}>
//         <button className="chat-toggle-btn" onClick={toggleChat}>
//           {isChatOpen ? "Close Chat" : "Open Chat"}
//         </button>
//       </div>

//       {isChatOpen && (
//         <div className="chatbot-container">
//           <div className="chat-header">
//             <h2>Chat with us</h2>
//             <button className="chat-close-btn" onClick={toggleChat}>
//               ✕
//             </button>
//           </div>

//           <div className="chat-body">
//             {isLoading ? (
//               <p>Loading conversation...</p>
//             ) : (
//               <div className="chat-messages">
//                 {conversation.length > 0 ? (
//                   conversation.map((msg, index) => (
//                     <div key={index} className="message">
//                       <strong>{msg.sender}:</strong> {msg.text}
//                     </div>
//                   ))
//                 ) : (
//                   <p>No messages yet. Start the conversation!</p>
//                 )}
//                 {error && <p className="error">{error}</p>}
//               </div>
//             )}
//           </div>

//           <form className="chat-footer" onSubmit={handleSendMessage}>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="input"
//               required
//             />
//             <textarea
//               placeholder="Type your message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="textarea"
//               required
//             ></textarea>
//             <button type="submit" className="send-btn">
//               <BsSend />
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotLogic;
