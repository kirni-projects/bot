import React from 'react';
import ReactDOM from 'react-dom';
import WidgetContainer from './components/widgetContainer';
import './index.css';  // Ensure that your Tailwind CSS is bundled

// Function to render the widget into a specific element
const renderWidget = (elementId) => {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    ReactDOM.render(<WidgetContainer />, rootElement);
  } else {
    console.error(`Element with ID ${elementId} not found.`);
  }
};

// Attach the renderWidget function to the global window object
if (typeof window !== 'undefined') {
  console.log('renderWidget.js is loaded, defining window.renderChatWidget.');
  window.renderChatWidget = renderWidget;  // Make renderChatWidget globally available
}
