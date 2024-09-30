// frontend/src/widget.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import WidgetContainer from './components/widgetContainer/index.jsx';

// This function appends the widget to the target container
function appendChatWidget() {
  const widgetContainer = document.getElementById('chat-widget-container');
  if (widgetContainer) {
    const widgetRoot = createRoot(widgetContainer);
    widgetRoot.render(<WidgetContainer />);
  } else {
    console.error('Chat widget container not found!');
  }
}

// Wait until the DOM is fully loaded before appending the widget
window.addEventListener('load', appendChatWidget);


// frontend/public/widget.js
// (function () {
//   // Create a div to hold the chatbot widget
//   const chatWidgetContainer = document.createElement('div');
//   chatWidgetContainer.id = 'chat-widget-root'; // Unique ID for the root container
//   document.body.appendChild(chatWidgetContainer); // Append the widget container to the body

//   // Load the React widget into the container
//   const loadReactWidget = () => {
//     const script = document.createElement('script');
//     script.src = 'https://bot-rd1k.onrender.com/chatbotLogic.jsx'; // Update to match your production script URL
//     script.type = 'module';
//     document.head.appendChild(script);

//     script.onload = () => {
//       console.log('Chatbot widget loaded successfully.');
//     };
//     script.onerror = () => {
//       console.error('Failed to load chatbot widget script.');
//     };
//   };

//   // Call the function to load the widget
//   loadReactWidget();
// })();






// (function () {
//   const scriptDomain = 'https://bot-rd1k.onrender.com';

//   // Create and inject the widget's container into the DOM
//   const widgetContainer = document.createElement('div');
//   widgetContainer.id = 'chat-widget-container';
//   widgetContainer.style.position = 'fixed';
//   widgetContainer.style.bottom = '20px';
//   widgetContainer.style.right = '20px';
//   widgetContainer.style.zIndex = '10000';
//   document.body.appendChild(widgetContainer);

//   // Inject React component via ReactDOM
//   const script = document.createElement('script');
//   script.src = `${scriptDomain}/assets/chatbotLogic-[hash].js`; // Reference compiled JS, not JSX
//   script.type = 'module';
//   widgetContainer.appendChild(script);

//   // Inject CSS dynamically for widget styling
//   const linkElement = document.createElement('link');
//   linkElement.rel = 'stylesheet';
//   linkElement.href = `${scriptDomain}/src/index.css`; // Use your live URL for the CSS file
//   document.head.appendChild(linkElement);
// })();











// (function () {
//   const scriptDomain = 'https://bot-rd1k.onrender.com';

//   // Create and inject the widget's container into the DOM
//   const widgetContainer = document.createElement('div');
//   widgetContainer.id = 'chat-widget-container';
//   widgetContainer.style.position = 'fixed';
//   widgetContainer.style.bottom = '20px';
//   widgetContainer.style.right = '20px';
//   widgetContainer.style.zIndex = '10000';
//   document.body.appendChild(widgetContainer);

//   // Load the chat widget's HTML
//   const widgetHTML = `
//     <div class="chat-widget">
//       <div class="chat-avatar fixed right-3 bottom-5 cursor-pointer">
//         <div class="p-4 w-16 rounded-full bg-orange-400">
//           <img id="widgetAvatar" src="${scriptDomain}/assets/icons/sms.png" alt="Chat" />
//         </div>
//       </div>
//       <div id="messageContainer" class="messageContainer" style="display: none;"></div>
//     </div>
//   `;

//   widgetContainer.innerHTML = widgetHTML;

//   // Add the click event listener to toggle the chat container
//   const widgetAvatar = document.getElementById('widgetAvatar');
//   const messageContainer = document.getElementById('messageContainer');

//   widgetAvatar.addEventListener('click', function () {
//     if (messageContainer.style.display === 'none') {
//       messageContainer.style.display = 'block';
//     } else {
//       messageContainer.style.display = 'none';
//     }
//   });

//   // Fetch and inject additional content (e.g., chat conversation or form)
//   fetchChatWidgetContent();

//   function fetchChatWidgetContent() {
//     const chatWidgetUrl = `${scriptDomain}/chatbotLogic.jsx`;

//     fetch(chatWidgetUrl)
//       .then((response) => response.text())
//       .then((html) => {
//         messageContainer.innerHTML = html;
//       })
//       .catch((err) => console.error('Failed to load chat widget content:', err));
//   }

//   // Inject CSS dynamically for widget styling
//   const linkElement = document.createElement('link');
//   linkElement.rel = 'stylesheet';
//   linkElement.href = `${scriptDomain}/src/index.css`; // Use your live URL for the CSS file
//   document.head.appendChild(linkElement);
// })();
