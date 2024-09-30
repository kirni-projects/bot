// src/components/widgetContainer/index.jsx
import React, { useState } from 'react';
import widgetAvatar from "../../assets/icons/sms.png";  // Path to your widget icon
import widgetClose from "../../assets/icons/close32X32.png";  // Path to close icon
import MessageContainer from './messages/messageContainer.jsx'; // Import the message container

const WidgetContainer = () => {
  const [showAvatar, setShowAvatar] = useState(true);
  const [showMessageContainer, setShowMessageContainer] = useState(false);

  const avatarChange = () => {
    setShowAvatar(!showAvatar);  // Toggle between showing avatar and close icon
    setShowMessageContainer(!showMessageContainer);  // Toggle the message container
  };

  return (
    <div className="chat-widget relative m-4">
      <div className="chat-avatar fixed right-3 bottom-5 cursor-pointer" onClick={avatarChange}>
        <div className="p-4 w-16 rounded-full bg-orange-400">
          <img
            src={showAvatar ? widgetAvatar : widgetClose}
            alt={showAvatar ? "Chat" : "Close"}
            className={showAvatar ? 'rotate-out' : 'rotate-in'}
          />
        </div>
      </div>
      {showMessageContainer && <MessageContainer />}  {/* Render the chat messages */}
    </div>
  );
};

export default WidgetContainer;