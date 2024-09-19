import React, { useEffect, useState } from "react";
import getSocket from "./socket/getSocket";
import { useAuthContext } from "./AuthContext.jsx";
import Messages from "./messages.jsx";
import MessageInput from "./MessageInput.jsx";

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
      const response = await fetch(`/api/messages/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const conversationData = await response.json();
        setConversation(
          Array.isArray(conversationData.messages)
            ? conversationData.messages
            : []
        );
        setLoading(false);
      } else {
        console.error("Failed to fetch conversation data");
        setError(new Error("Failed to fetch conversation data"));
      }
    } catch (error) {
      console.error("Server error:", error);
      setError(error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchConversation();
      socket.emit("joinRoom", user._id); // Join the room based on user ID

      const handleMessage = (message) => {
        setConversation((prev) => [...prev, message]);
      };

      socket.on("message", handleMessage);

      // Clean up the event listener on unmount or when user._id changes
      return () => {
        socket.off("message", handleMessage);
      };
    }
  }, [user]);

  const handleNewMessage = (newMessage) => {
    socket.emit("message", newMessage); // Emit message to the server
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="card-header bg-orange-400 flex justify-between align-middle text-center items-center p-3">
        <div className="avatar items-center ">
          <div className="w-10 mr-3 border-solid border-opacity-100 border-2 rounded-full">
            <img src={user.profilePic} />
          </div>
          <span className="text-white text-lg font-semibold">{user.username}</span>
        </div>
      </div>
      <div className="card-body p-1">
        <Messages messages={conversation} />
      </div>
      <div className="card-footer">
        <MessageInput userId={user._id} onNewMessage={handleNewMessage} />
      </div>
    </>
  );
};

export default Message;





// import React, { useEffect, useState } from "react";
// import getSocket from "../messages/socket/getSocket.jsx";
// import { useAuthContext } from "./AuthContext.jsx";
// import Messages from "./messages.jsx";
// import MessageInput from "./MessageInput.jsx";

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
//       const response = await fetch(`/api/messages/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         const conversationData = await response.json();
//         setConversation(
//           Array.isArray(conversationData.messages)
//             ? conversationData.messages
//             : []
//         );
//         setLoading(false);
//       } else {
//         console.error("Failed to fetch conversation data");
//         setError(new Error("Failed to fetch conversation data"));
//       }
//     } catch (error) {
//       console.error("Server error:", error);
//       setError(error);
//     }
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       fetchConversation();
//       socket.emit("joinRoom", user._id); // Join the room based on user ID

//       const handleMessage = (message) => {
//         setConversation((prev) => [...prev, message]);
//       };

//       socket.on("message", handleMessage);

//       // Clean up the event listener on unmount or when user._id changes
//       return () => {
//         socket.off("message", handleMessage);
//       };
//     }
//   }, [user]);

//   const handleNewMessage = (newMessage) => {
//     setConversation((prev) => [...prev, newMessage]);
//     socket.emit("message", newMessage); // Emit message to the server
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <>
//       <div className="card-header bg-orange-400 flex justify-between align-middle text-center items-center p-3">
//         <div className="avatar items-center ">
//           <div className="w-10 mr-3 border-solid border-opacity-100 border-2 rounded-full">
//             <img src={user.profilePic} />
//           </div>
//           <span className="text-white text-lg font-semibold">{user.username}</span>
//         </div>
//       </div>
//       <div className="card-body p-1">
//         <Messages messages={conversation} />
//       </div>
//       <div className="card-footer">
//         <MessageInput userId={user._id} onNewMessage={handleNewMessage} />
//       </div>
//     </>
//   );
// };

// export default Message;






// message.jsx
// import React, { useEffect, useState } from "react";
// import getSocket from "../messages/socket/getSocket.jsx";
// import { useAuthContext } from "./AuthContext.jsx";
// import Messages from "./messages.jsx";
// import MessageInput from "./MessageInput.jsx";

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
//       const response = await fetch(`/api/messages/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         const conversationData = await response.json();
//         setConversation(
//           Array.isArray(conversationData.messages)
//             ? conversationData.messages
//             : []
//         );
//         setLoading(false);
//       } else {
//         console.error("Failed to fetch conversation data");
//         setError(new Error("Failed to fetch conversation data"));
//       }
//     } catch (error) {
//       console.error("Server error:", error);
//       setError(error);
//     }
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       fetchConversation();
//       socket.emit("joinRoom", user._id); // Join the room based on user ID

//       const handleMessage = (message) => {
//         setConversation((prev) => [...prev, message]);
//       };

//       socket.on("message", handleMessage);

//       // Clean up the event listener on unmount or when user._id changes
//       return () => {
//         socket.off("message", handleMessage);
//       };
//     }
//   }, [user]);

//   const handleNewMessage = (newMessage) => {
//     setConversation((prev) => [...prev, newMessage]);
//     socket.emit("message", newMessage); // Emit message to the server
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <>
//       <div className="card-header bg-orange-400 flex justify-between align-middle text-center items-center p-3">
//         <div className="avatar items-center ">
//           <div className="w-10 mr-3 border-solid border-opacity-100 border-2 rounded-full">
//             <img src={user.profilePic} />
//           </div>
//           <span className="text-white text-lg font-semibold">{user.username}</span>
//         </div>
//       </div>
//       <div className="card-body p-1">
//         <Messages messages={conversation} />
//       </div>
//       <div className="card-footer">
//         <MessageInput userId={user._id} onNewMessage={handleNewMessage} />
//       </div>
//     </>
//   );
// };

// export default Message;












// import React, { useEffect, useState } from "react";
// import getSocket from "../messages/socket/getSocket.jsx";
// import { useAuthContext } from "./AuthContext.jsx";
// import Messages from "./messages.jsx";
// import MessageInput from "./MessageInput.jsx";

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
//       const response = await fetch(`/api/messages/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         const conversationData = await response.json();
//         setConversation(
//           Array.isArray(conversationData.messages)
//             ? conversationData.messages
//             : []
//         );
//         setLoading(false);
//       } else {
//         console.error("Failed to fetch conversation data");
//         setError(new Error("Failed to fetch conversation data"));
//       }
//     } catch (error) {
//       console.error("Server error:", error);
//       setError(error);
//     }
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       fetchConversation();
//       socket.emit("joinRoom", user._id); // Join the room based on user ID

//       const handleMessage = (message) => {
//         setConversation((prev) => [...prev, message]);
//       };

//       socket.on("message", handleMessage);

//       // Clean up the event listener on unmount or when user._id changes
//       return () => {
//         socket.off("message", handleMessage);
//       };
//     }
//   }, [user]);

//   const handleNewMessage = (newMessage) => {
//     setConversation((prev) => [...prev, newMessage]);
//     socket.emit("message", newMessage); // Emit message to the server
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <>
//       <div className="card-header bg-orange-400 flex justify-between align-middle text-center items-center p-3">
//         <div className="avatar items-center ">
//           <div className=" w-10 mr-3 border-solid border-opacity-100 border-2 rounded-full">
//             <img src={user.profilePic} />
//           </div>
//           <span className="text-white text-lg font-semibold">{user.username}</span>
//         </div>
//         {/* <details className="dropdown dropdown-bottom dropdown-end">
//           <summary className="btn pl-0 pr-1 bg-transparent border-none shadow-none hover:bg-transparent">
//           <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 className="inline-block h-6 w-65 stroke-current text-white">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"></path>
//               </svg>
//           </summary>
//           <ul className="menu dropdown-content bg-base-100 rounded-md z-[1] p-0 w-24 shadow">
//             <li className="hover:bg-orange-400 hover:text-white bg-transparent rounded-md"><a>Log out</a></li>
//           </ul>
//         </details> */}
//       </div>
//       <div className="card-body p-1">
//         <Messages messages={conversation} />
//       </div>
//       <div className="card-footer">
//         <MessageInput userId={user._id} onNewMessage={handleNewMessage} />
//       </div>
//     </>
//   );
// };

// export default Message;


// // working proper this code
// import React, { useEffect, useState } from 'react';
// import { useAuthContext } from './AuthContext.jsx';
// import Messages from './messages.jsx';
// import MessageInput from './MessageInput.jsx';

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
//       const response = await fetch(`/api/messages/${user._id}`, {
//         headers: {
//           'Authorization': `Bearer ${user.token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       if (response.ok) {
//         const conversationData = await response.json();
//         console.log('API response:', conversationData); // Debugging line
//         setConversation(Array.isArray(conversationData.messages) ? conversationData.messages : []);
//         setLoading(false);
//       } else {
//         console.error('Failed to fetch conversation data');
//         setError(new Error('Failed to fetch conversation data'));
//       }
//     } catch (error) {
//       console.error('Server error:', error);
//       setError(error);
//     }
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       fetchConversation();
//     }
//   }, [user]);

//   const handleNewMessage = (newMessage) => {
//     setConversation((prev) => [...prev, newMessage]);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <>
//       <div className="card-header bg-orange-400 flex justify-between align-middle text-center items-center p-2">
//         <div className="avatar items-center ">
//           <div className=" w-9 mr-2 border-solid border-opacity-100 border-2 rounded-full">
//             <img src={user.profilePic} />
//           </div>
//           <span className="text-white text-lg font-semibold">{user.username}</span>
//         </div>
//         <details className="dropdown dropdown-bottom dropdown-end">
//           <summary className="btn pl-0 pr-1 bg-transparent border-none shadow-none hover:bg-transparent">
//           <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 className="inline-block h-6 w-65 stroke-current text-white">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"></path>
//               </svg>
//           </summary>
//           <ul className="menu dropdown-content bg-base-100 rounded-md z-[1] p-0 w-24 shadow">
//             <li className="hover:bg-orange-400 hover:text-white bg-transparent rounded-md"><a onClick={logout}>Log out</a></li>
//           </ul>
//         </details>
//       </div>
//       <div className="card-body p-1">
//         <Messages messages={conversation} />
//       </div>
//       <div className="card-footer">
//         <MessageInput userId={user._id} onNewMessage={handleNewMessage} />
//       </div>
//     </>
//   );
// };

// export default Message;

// import React, { useEffect, useState } from 'react';
// import Messages from './messages.jsx';
// import MessageInput from './MessageInput.jsx';
// import { useAuthContext } from './AuthContext.jsx';

// const Message = () => {
//   const { user } = useAuthContext();
//   const [conversation, setConversation] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchConversation = async () => {
//     if (!user) {
//       setError(new Error("User not authenticated"));
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(`/api/messages/${user._id}`, {
//         headers: {
//           'Authorization': `Bearer ${user.token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const conversationData = await response.json();
//         setConversation(conversationData);
//       } else {
//         setError(new Error('Failed to fetch conversation data'));
//       }
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       fetchConversation();
//     }
//   }, [user]);

//   const handleNewMessage = (newMessage) => {
//     setConversation(prev => [...prev, newMessage]);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <>
//       <div className="card-body p-3">
//         <Messages messages={conversation} />
//       </div>
//       <div className="card-footer">
//         <MessageInput receiverId={user._id} onNewMessage={handleNewMessage} />
//       </div>
//     </>
//   );
// };

// export default Message;
