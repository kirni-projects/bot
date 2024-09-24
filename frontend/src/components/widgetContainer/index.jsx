import React, { useState } from 'react';
import widgetAvatar from "../../assets/icons/sms.png";
import widgetClose from "../../assets/icons/close32X32.png";
import MessageContainer from "./messages/messageContainer.jsx"; // Assuming correct import path

const WidgetContainer = () => {
  const [showAvatar, setShowAvatar] = useState(true);
  const [showMessageContainer, setShowMessageContainer] = useState(false);

  const avatarChange = () => {
    setShowAvatar(!showAvatar);
    setShowMessageContainer(!showMessageContainer);
  };

  return (
    <div className="chat-widget relative m-4">
      <div className="avatar chat-image fixed right-3 bottom-5 cursor-pointer">
        <div className="p-4 w-16 rounded-full bg-orange-400" onClick={avatarChange}>
          <img
            src={showAvatar ? widgetAvatar : widgetClose}
            alt={showAvatar ? "Avatar" : "Close"}
            className={showAvatar ? 'rotate-out' : 'rotate-in'}
          />
        </div>
      </div>
      {showMessageContainer && <MessageContainer />}
    </div>
  );
};

export default WidgetContainer;
