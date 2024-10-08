import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
      {showMessageContainer && <MessageContainer />} 
    </div>
  );
};

// Function to render the widget into a specific element
const renderWidget = (elementId) => {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    ReactDOM.render(<WidgetContainer />, rootElement);
  } else {
    console.error(`Element with ID ${elementId} not found.`);
  }
};

// Ensure the function is attached to the global window object
if (typeof window !== 'undefined') {
  window.renderChatWidget = renderWidget; // Attach the render function globally to the window object
}

export default WidgetContainer;