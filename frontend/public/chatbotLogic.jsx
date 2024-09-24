import React from 'react';
import ReactDOM from 'react-dom/client';  // Use React 18 syntax
import WidgetContainer from '../src/components/widgetContainer/index.jsx';  // Adjust the import if needed

// Initialize the chatbot widget
function initChatbot({ eid }) {
  const widgetContainer = document.getElementById('chatbot-widget-container');
  if (!widgetContainer) return;

  // React 18 syntax for creating a root and rendering the component
  const root = ReactDOM.createRoot(widgetContainer);
  root.render(
    <React.StrictMode>
      <WidgetContainer eid={eid} />
    </React.StrictMode>
  );
}

window.initChatbot = initChatbot;













// import React from 'react';
// import ReactDOM from 'react-dom';  // Import ReactDOM
// import WidgetContainer from '../src/components/widgetContainer/index.jsx';  // Import your WidgetContainer

// // Initialize the chatbot widget
// function initChatbot({ eid }) {
//   const widgetContainer = document.getElementById('chatbot-widget-container');
//   if (!widgetContainer) return;

//   const root = ReactDOM.createRoot(widgetContainer);  // React 18 syntax for creating a root
//   root.render(
//     <React.StrictMode>
//       <WidgetContainer eid={eid} />
//     </React.StrictMode>
//   );
// }

// window.initChatbot = initChatbot;  // Attach initChatbot to the global window object
