// src/components/widgetContainer/index.jsx
import React, { useEffect, useState } from 'react';
import widgetAvatar from "../../assets/sms.png";
import widgetClose from "../../assets/close32X32.png";
import MessageContainer from './messages/messageContainer.jsx';
import ErrorBoundary from './messages/utils/ErrorBoundary.jsx'; // Assuming you created an ErrorBoundary component

const WidgetContainer = () => {
  const [showAvatar, setShowAvatar] = useState(true);
  const [showMessageContainer, setShowMessageContainer] = useState(false);

  const avatarChange = () => {
    console.log("Avatar clicked, toggling showMessageContainer");
    setShowAvatar(!showAvatar);
    setShowMessageContainer(!showMessageContainer);
  };

  useEffect(() => {
    console.log("showMessageContainer changed:", showMessageContainer);
  }, [showMessageContainer]);

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
      {showMessageContainer && (
        <ErrorBoundary>
          <MessageContainer />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default WidgetContainer;
