// src/components/widgetContainer/index.jsx
// src/components/widgetContainer/index.jsx
import React, { useState } from 'react';
import widgetAvatar from "../../assets/icons/sms.png";
import widgetClose from "../../assets/icons/close32X32.png";
import MessageContainer from './messages/messageContainer.jsx';

const WidgetContainer = () => {
  const [showAvatar, setShowAvatar] = useState(true);
  const [showMessageContainer, setShowMessageContainer] = useState(false);

  const avatarChange = () => {
    setShowAvatar(!showAvatar);
    setShowMessageContainer(!showMessageContainer);
  };

  return (
    <div className="chat-widget-container" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000, // Make sure it's always on top
      maxWidth: '400px', // Ensure a reasonable width
      width: '100%',
    }}>
      <div onClick={avatarChange} style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        cursor: 'pointer',
        zIndex: 1001, // Slightly higher than the widget
      }}>
        <img
          src={showAvatar ? widgetAvatar : widgetClose}
          alt={showAvatar ? "Chat" : "Close"}
          style={{ width: '50px', height: '50px' }}  // Adjust the size accordingly
        />
      </div>

      {showMessageContainer && <MessageContainer />}
    </div>
  );
};

export default WidgetContainer;






// import React, { useState } from 'react';
// import widgetAvatar from "../../assets/icons/sms.png";  // Path to your widget icon
// import widgetClose from "../../assets/icons/close32X32.png";  // Path to close icon
// import MessageContainer from './messages/messageContainer.jsx'; // Import the message container

// const WidgetContainer = ({ eid }) => {
//   const [showAvatar, setShowAvatar] = useState(true);
//   const [showMessageContainer, setShowMessageContainer] = useState(false);

//   const toggleWidget = () => {
//     setShowAvatar(!showAvatar);  // Toggle between showing avatar and close icon
//     setShowMessageContainer(!showMessageContainer);  // Toggle the message container
//   };

//   return (
//     <div className="chat-widget relative" id="chatbot-widget-container">
//       {/* Floating avatar icon for chat widget */}
//       <div
//         className="chat-avatar fixed right-3 bottom-5 cursor-pointer"
//         onClick={toggleWidget}
//         style={{ zIndex: 1000 }}
//       >
//         <div className="p-4 w-16 h-16 rounded-full bg-orange-400">
//           <img
//             src={showAvatar ? widgetAvatar : widgetClose}
//             alt={showAvatar ? "Chat" : "Close"}
//             style={{ width: "100%", height: "100%" }}
//           />
//         </div>
//       </div>
//       {/* Message container that opens on click */}
//       {showMessageContainer && (
//         <div
//           className="message-container fixed right-3 bottom-20"
//           style={{
//             width: "320px",
//             height: "500px",
//             backgroundColor: "white",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//             zIndex: 1001
//           }}
//         >
//           <MessageContainer eid={eid} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default WidgetContainer;



// import React, { useState } from 'react';
// import widgetAvatar from "../../assets/icons/sms.png";  // Path to your widget icon
// import widgetClose from "../../assets/icons/close32X32.png";  // Path to close icon
// import MessageContainer from './messages/messageContainer.jsx'; // Import the message container

// const WidgetContainer = ({ eid }) => {
//   const [showAvatar, setShowAvatar] = useState(true);
//   const [showMessageContainer, setShowMessageContainer] = useState(false);

//   const toggleWidget = () => {
//     setShowAvatar(!showAvatar);  // Toggle between showing avatar and close icon
//     setShowMessageContainer(!showMessageContainer);  // Toggle the message container
//   };

//   return (
//     <div className="chat-widget relative" id="chatbot-widget-container">
//       {/* Floating avatar icon for chat widget */}
//       <div
//         className="chat-avatar fixed right-3 bottom-5 cursor-pointer"
//         onClick={toggleWidget}
//         style={{ zIndex: 1000 }}
//       >
//         <div className="p-4 w-16 h-16 rounded-full bg-orange-400">
//           <img
//             src={showAvatar ? widgetAvatar : widgetClose}
//             alt={showAvatar ? "Chat" : "Close"}
//             style={{ width: "100%", height: "100%" }}
//           />
//         </div>
//       </div>
//       {/* Message container that opens on click */}
//       {showMessageContainer && (
//         <div
//           className="message-container fixed right-3 bottom-20"
//           style={{
//             width: "320px",
//             height: "500px",
//             backgroundColor: "white",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//             zIndex: 1001
//           }}
//         >
//           <MessageContainer eid={eid} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default WidgetContainer;
