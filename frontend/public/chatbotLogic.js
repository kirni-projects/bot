// frontend/public/chatbotLogic.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import WidgetContainer from '../src/components/widgetContainer/index.jsx'; // Adjust the import path as necessary

// Initialize the chatbot widget
function initChatbot({ eid }) {
  const widgetContainer = document.getElementById('chatbot-widget-container');
  if (!widgetContainer) return;

  // Render the React chatbot component
  const root = ReactDOM.createRoot(widgetContainer);
  root.render(
    <React.StrictMode>
      <WidgetContainer eid={eid} />
    </React.StrictMode>
  );
}

// Expose the initChatbot function to the global scope
window.initChatbot = initChatbot;
