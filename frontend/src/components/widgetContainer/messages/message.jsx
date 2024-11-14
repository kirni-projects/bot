// src/components/widgetContainer/messages/Message.jsx
import React, { useEffect, useState } from "react";
import axios from 'axios';
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
      const response = await axios.get(`${apiUrl}/api/chat/me`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setConversation(response.data.messages || []);
    } catch (error) {
      console.error("Error fetching conversation data:", error);
      setError(error);
    }
    
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/messages/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setConversation(response.data.messages || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching conversation data:", error);
      setError(error);
      setLoading(false);
    }
  };
// Only add the listener once when the component mounts
useEffect(() => {
  if (user && user._id) {
    fetchConversation();
    socket.emit("joinRoom", user._id);

    // Define the message handler
    const handleMessage = (message) => {
      // Avoid adding duplicate messages to the state
      setConversation((prev) => {
        if (!prev.find((msg) => msg.createdAt === message.createdAt && msg.text === message.text)) {
          return [...prev, message];
        }
        return prev;
      });
    };

    // Attach the listener
    socket.on("message", handleMessage);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      socket.off("message", handleMessage);
    };
  }
}, [user]);

  const handleNewMessage = (newMessage) => {
    socket.emit("message", { text: newMessage, sender: user._id });
    setConversation((prev) => [
      ...prev,
      { sender: user._id, text: newMessage, createdAt: new Date().toISOString() },
    ]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="card-header bg-orange-400 flex justify-between align-middle text-center items-center p-3">
        <div className="avatar items-center ">
          <div className="w-10 mr-3 border-solid border-opacity-100 border-2 rounded-full">
            <img src={user.profilePic} alt="User profile" />
          </div>
          <span className="text-white text-lg font-semibold">{user.username}</span>
        </div>
      </div>
      <div className="card-body p-1">
        <Messages initialMessages={conversation} />
      </div>
      <div className="card-footer">
        <MessageInput userId={user._id} onNewMessage={handleNewMessage} />
      </div>
    </>
  );
};

export default Message;



// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import getSocket from "./socket/getSocket";
// import { useAuthContext } from "./AuthContext.jsx";
// import Messages from "./messages.jsx";
// import MessageInput from "./MessageInput.jsx";
// import apiUrl from '../../../apiConfig';

// const socket = getSocket();

// const Message = () => {
//   const { user } = useAuthContext();
//   const [conversation, setConversation] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchConversation = async () => {
//     if (!user) {
//       setError(new Error("User not authenticated"));
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.get(`${apiUrl}/api/messages/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setConversation(response.data.messages || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching conversation data:", error);
//       setError(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       fetchConversation();

//       // Emit `joinRoom` only once for this user
//       socket.emit("joinRoom", user._id);

//       const handleMessage = (message) => {
//         console.log("New message received:", message);

//         // Prevent duplicate messages
//         setConversation((prev) => {
//           const isDuplicate = prev.some(
//             (msg) => msg.sender === message.sender && msg.text === message.text && msg.createdAt === message.createdAt
//           );
//           if (!isDuplicate) {
//             return [...prev, message];
//           } else {
//             console.warn("Duplicate message prevented:", message);
//             return prev;
//           }
//         });
//       };

//       // Ensure listener is added only once
//       if (!socket.hasListeners("message")) {
//         socket.on("message", handleMessage);
//       }

//       // Cleanup function to remove the listener when component unmounts
//       return () => {
//         socket.off("message", handleMessage);
//       };
//     }
//   }, [user?._id]); // Runs only when user ID changes

//   const handleNewMessage = (newMessage) => {
//     socket.emit("message", { text: newMessage, sender: user._id });
//     setConversation((prev) => [
//       ...prev,
//       { sender: user._id, text: newMessage, createdAt: new Date().toISOString() },
//     ]);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <>
//       <div className="card-header bg-orange-400 flex justify-between align-middle text-center items-center p-3">
//         <div className="avatar items-center ">
//           <div className="w-10 mr-3 border-solid border-opacity-100 border-2 rounded-full">
//             <img src={user.profilePic} alt="User profile" />
//           </div>
//           <span className="text-white text-lg font-semibold">{user.username}</span>
//         </div>
//       </div>
//       <div className="card-body p-1">
//         <Messages initialMessages={conversation} />
//       </div>
//       <div className="card-footer">
//         <MessageInput userId={user._id} onNewMessage={handleNewMessage} />
//       </div>
//     </>
//   );
// };

// export default Message;



// working fine import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import getSocket from "./socket/getSocket";
// import { useAuthContext } from "./AuthContext.jsx";
// import Messages from "./messages.jsx";
// import MessageInput from "./MessageInput.jsx";
// import apiUrl from '../../../apiConfig';

// const socket = getSocket();

// const Message = () => {
//   const { user } = useAuthContext();
//   const [conversation, setConversation] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchConversation = async () => {
//     if (!user) {
//       setError(new Error("User not authenticated"));
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.get(`${apiUrl}/api/messages/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setConversation(response.data.messages || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching conversation data:", error);
//       setError(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       fetchConversation();
//       socket.emit("joinRoom", user._id);

//       const handleMessage = (message) => {
//         setConversation((prev) => [...prev, message]);
//       };

//       socket.on("message", handleMessage);

//       return () => {
//         socket.off("message", handleMessage);
//       };
//     }
//   }, [user]);

//   // Define handleNewMessage here
//   const handleNewMessage = (newMessage) => {
//     // Emit the message through socket and update the conversation state
//     socket.emit("message", { text: newMessage, sender: user._id });
//     setConversation((prev) => [...prev, { sender: user._id, text: newMessage, createdAt: new Date().toISOString() }]);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <>
//       <div className="card-header bg-orange-400 flex justify-between align-middle text-center items-center p-3">
//         <div className="avatar items-center ">
//           <div className="w-10 mr-3 border-solid border-opacity-100 border-2 rounded-full">
//             <img src={user.profilePic} alt="User profile" />
//           </div>
//           <span className="text-white text-lg font-semibold">{user.username}</span>
//         </div>
//       </div>
//       <div className="card-body p-1">
//         <Messages initialMessages={conversation} />
//       </div>
//       <div className="card-footer">
//         <MessageInput userId={user._id} onNewMessage={handleNewMessage} />
//       </div>
//     </>
//   );
// };

// export default Message;

