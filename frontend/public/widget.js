// widget.js
(function () {
  const script = document.currentScript;
  const eid = script.getAttribute('data-eid');

  // Create a container for the chatbot widget
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'chatbot-widget-container';
  widgetContainer.style.position = 'fixed';
  widgetContainer.style.bottom = '0';
  widgetContainer.style.right = '0';
  widgetContainer.style.zIndex = '9999';
  document.body.appendChild(widgetContainer);

  // Load the chatbot logic
  const scriptElement = document.createElement('script');
  scriptElement.src = 'https://bot-rd1k.onrender.com/chatbotLogic.js';  // Ensure this points to the correct path
  scriptElement.onload = function () {
    if (typeof initChatbot === 'function') {
      initChatbot({ eid });
    }
  };
  document.body.appendChild(scriptElement);
})();



// // public/widget.js
// (function () {
//   const script = document.currentScript;
//   const allowedDomain = script.getAttribute('data-domain');
//   const eid = script.getAttribute('data-eid'); // unique user identifier from the backend

//   if (window.location.hostname === allowedDomain) {
//     const widgetContainer = document.createElement('div');
//     widgetContainer.id = 'chatbot-widget-container';
//     widgetContainer.style.position = 'fixed';
//     widgetContainer.style.bottom = '0';
//     widgetContainer.style.right = '0';
//     widgetContainer.style.zIndex = '9999';
//     document.body.appendChild(widgetContainer);

//     const scriptElement = document.createElement('script');
//     scriptElement.src = 'https://bot-rd1k.onrender.com/chatbotLogic.js'; // Adjust this to your deployment
//     scriptElement.onload = function () {
//       if (typeof initChatbot === 'function') {
//         initChatbot({ eid });
//       }
//     };
//     document.body.appendChild(scriptElement);
//   } else {
//     console.error('Domain not allowed to load chatbot.');
//   }
// })();
