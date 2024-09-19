// messages/messageContainer.jsx
import React from 'react';
import RouteContainer from '../../routes/route.jsx';

const MessageContainer = () => {
  return (
    <div className="messageContainer">
      <div className="card w-96 bg-base-100 shadow-xl" style={{height:"526px"}}>
        <RouteContainer />
      </div>
    </div>
  )
}

export default MessageContainer;
