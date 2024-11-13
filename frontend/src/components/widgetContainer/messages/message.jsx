// src/components/widgetContainer/messages/Message.jsx
import React, { useEffect, useState, useCallback } from "react";
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

  // Memoized message handler to prevent re-render duplication
  const handleMessage = useCallback((message) => {
    setConversation((prev) => {
      // Only add the message if it is not already in the state
      if (!prev.find((msg) => msg._id === message._id)) {
        return [...prev, message];
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (user && user._id) {
      fetchConversation();
      socket.emit("joinRoom", user._id);
      
      // Attach the socket listener only once
      socket.on("message", handleMessage);

      // Clean up the socket listener on unmount
      return () => {
        socket.off("message", handleMessage);
      };
    }
  }, [user, handleMessage]); // Only re-run if `user` or `handleMessage` changes

  const handleNewMessage = (newMessage) => {
    socket.emit("message", { text: newMessage, sender: user._id });
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






// working import React, { useEffect, useState } from "react";
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

//       // Define the message handler
//       const handleMessage = (message) => {
//         setConversation((prev) => [...prev, message]);
//       };

//       // Attach the listener
//       socket.on("message", handleMessage);

//       // Cleanup function to remove the listener when the component unmounts
//       return () => {
//         socket.off("message", handleMessage);
//       };
//     }
//   }, [user]); // Dependency array ensures this only runs when `user` changes


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

