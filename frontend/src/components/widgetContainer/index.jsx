import React, { useState } from 'react';
import widgetAvatar from "../../assets/sms.png";  
import widgetClose from "../../assets/close32X32.png";  
import MessageContainer from './messages/messageContainer.jsx';

const WidgetContainer = () => {
  const [showAvatar, setShowAvatar] = useState(true);
  const [showMessageContainer, setShowMessageContainer] = useState(false);
  const [conversation, setConversation] = useState(() => {
    // Load conversation from localStorage or set default state
    const storedConversation = localStorage.getItem('conversation');
    return storedConversation ? JSON.parse(storedConversation) : null;
  });

  const avatarChange = () => {
    setShowAvatar(!showAvatar);
    setShowMessageContainer(!showMessageContainer);
    
    if (!conversation) {
      // Initiate new conversation
      setShowMessageContainer(false);
    } else {
      // Load previous conversation
      setShowMessageContainer(true);
    }
  };

  useEffect(() => {
    // Save conversation to localStorage to persist between sessions
    if (conversation) {
      localStorage.setItem('conversation', JSON.stringify(conversation));
    }
  }, [conversation]);

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
      {showMessageContainer && <MessageContainer conversation={conversation} />} 
    </div>
  );
};


export default WidgetContainer;





// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import widgetAvatar from "../../assets/sms.png";  
// import widgetClose from "../../assets/close32X32.png";  
// import MessageContainer from './messages/messageContainer.jsx';

// const WidgetContainer = () => {
//   const [showAvatar, setShowAvatar] = useState(true);
//   const [showMessageContainer, setShowMessageContainer] = useState(false);

//   const avatarChange = () => {
//     setShowAvatar(!showAvatar);  
//     setShowMessageContainer(!showMessageContainer);  
//   };

//   return (
//     <div className="chat-widget relative m-4">
//       <div className="chat-avatar fixed right-3 bottom-5 cursor-pointer" onClick={avatarChange}>
//         <div className="p-4 w-16 rounded-full bg-orange-400">
//           <img
//             src={showAvatar ? widgetAvatar : widgetClose}
//             alt={showAvatar ? "Chat" : "Close"}
//             className={showAvatar ? 'rotate-out' : 'rotate-in'}
//           />
//         </div>
//       </div>
//       {showMessageContainer && <MessageContainer />} 
//     </div>
//   );
// };


// export default WidgetContainer;
