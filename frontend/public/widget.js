// public/widget.js
(function () {
  const script = document.querySelector('script[src*="widget.js"]');
  const allowedDomain = script.getAttribute('data-domain');
  const eid = script.getAttribute('data-eid'); // unique user identifier from the backend

  // Check if the current domain matches the allowed domain from the database
  if (window.location.hostname === allowedDomain) {
    // Create a container for the chatbot widget
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'chatbot-container';
    widgetContainer.style.position = 'fixed';
    widgetContainer.style.bottom = '0';
    widgetContainer.style.right = '0';
    widgetContainer.style.zIndex = '9999';
    document.body.appendChild(widgetContainer);

    // Load the chatbot logic script dynamically
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://bot-rd1k.onrender.com/chatbotLogic.js';
    scriptElement.onload = function () {
      if (typeof initChatbot === 'function') {
        initChatbot({ eid }); // Pass the unique user identifier
      }
    };
    document.body.appendChild(scriptElement);
  } else {
    console.error('Domain not allowed to load chatbot.');
  }
})();

// (function() {
//   const scriptElement = document.querySelector('script[src*="widget.js"]');
//   const dataId = scriptElement.getAttribute('data-id');
//   const eid = scriptElement.getAttribute('eid');

//   // Fetch the allowed domain from the backend
//   async function fetchAllowedDomain() {
//     try {
//       const response = await fetch(`https://bot-rd1k.onrender.com/api/getdomainurl/${eid}`);
      
//       // Check if the response is JSON
//       if (!response.ok) {
//         console.error('Error fetching domain URL:', response.status, response.statusText);
//         return null;
//       }
      
//       const data = await response.json();
//       return data.domainURL;
//     } catch (error) {
//       console.error('Error fetching domain URL:', error);
//       return null;
//     }
//   }

//   async function initializeWidget() {
//     const allowedDomain = await fetchAllowedDomain();

//     if (!allowedDomain) {
//       console.error('Allowed domain could not be fetched.');
//       return;
//     }

//     // Check if the current domain matches the allowed domain
//     const currentDomain = window.location.hostname;
//     if (currentDomain !== allowedDomain) {
//       console.error('Chatbot script is not authorized for this domain.');
//       return;
//     }

//     function createChatbot() {
//       const container = document.createElement('div');
//       container.id = 'chatbot-widget-container';
//       container.style.position = 'fixed';
//       container.style.bottom = '0';
//       container.style.right = '0';
//       container.style.height = '400px';
//       container.style.zIndex = '1000';
//       document.body.appendChild(container);

//       const chatbotScript = document.createElement('script');
//       chatbotScript.src = `https://bot-rd1k.onrender.com/chatbotLogic.js`; // Load chatbot logic
//       chatbotScript.async = true;
//       document.body.appendChild(chatbotScript);

//       chatbotScript.onload = function() {
//         if (typeof initChatbot === 'function') {
//           initChatbot({ eid });  // Initialize the chatbot
//         }
//       };
//     }

//     if (!document.getElementById('chatbot-widget-container')) {
//       createChatbot();
//     }
//   }

//   initializeWidget();
// })();


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
