// frontend/public/chatbotLogic.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import WidgetContainer from '../src/components/widgetContainer/index.jsx';

// Ensure the script is only executed after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const chatWidgetRoot = document.getElementById('chat-widget-root');
  
  if (chatWidgetRoot) {
    const root = createRoot(chatWidgetRoot);
    root.render(<WidgetContainer />);  // Render the WidgetContainer component
  }
});
