import React from 'react';
import ReactDOM from 'react-dom';
import WidgetContainer from './components/widgetContainer';

const renderWidget = (elementId) => {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    ReactDOM.render(<WidgetContainer />, rootElement);
  } else {
    console.error(`Element with ID ${elementId} not found.`);
  }
};

if (typeof window !== 'undefined') {
  console.log('renderWidget.js is loaded, defining window.renderChatWidget.');
  window.renderChatWidget = renderWidget;
}
