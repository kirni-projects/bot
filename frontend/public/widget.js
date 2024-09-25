// public/widget.js

(function() {
  const scriptElement = document.querySelector('script[src*="widget.js"]');
  const eid = scriptElement.getAttribute('eid');

  async function fetchAllowedDomain() {
    try {
      const response = await fetch(`https://bot-rd1k.onrender.com/api/getdomainurl/${eid}`);
      const data = await response.json();
      return data.domainURL;
    } catch (error) {
      console.error('Error fetching domain URL:', error);
      return null;
    }
  }

  async function initializeWidget() {
    const allowedDomain = await fetchAllowedDomain();
    const currentDomain = window.location.hostname;

    if (allowedDomain !== currentDomain) {
      console.error('Chatbot script is not authorized for this domain.');
      return;
    }

    // Create the widget container on the page
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'chatbot-widget-container';
    widgetContainer.className = 'chat-widget';  // Apply chat-widget class for styling
    widgetContainer.style.zIndex = '1000';  // Ensure widget is above other elements

    document.body.appendChild(widgetContainer);

    // Load the chatbot logic (transpiled JavaScript)
    const chatbotScript = document.createElement('script');
    chatbotScript.src = `https://bot-rd1k.onrender.com/assets/chatbotLogic-[hash].js`;  // Use the transpiled .js file
    chatbotScript.async = true;
    document.body.appendChild(chatbotScript);

    chatbotScript.onload = function() {
      if (typeof window.initChatbot === 'function') {
        window.initChatbot({ eid });
      }
    };
  }

  initializeWidget();
})();







// (function() {
//   const scriptElement = document.querySelector('script[src*="widget.js"]');
//   const eid = scriptElement.getAttribute('eid');

//   async function fetchAllowedDomain() {
//     try {
//       const response = await fetch(`https://bot-rd1k.onrender.com/api/getdomainurl/${eid}`);
//       const data = await response.json();
//       return data.domainURL;
//     } catch (error) {
//       console.error('Error fetching domain URL:', error);
//       return null;
//     }
//   }

//   async function initializeWidget() {
//     const allowedDomain = await fetchAllowedDomain();
//     const currentDomain = window.location.hostname;

//     console.log('Current Domain:', currentDomain);
//     console.log('Allowed Domain:', allowedDomain);

//     if (allowedDomain !== currentDomain) {
//       console.error('Chatbot script is not authorized for this domain.');
//       return;
//     }

//     const widgetContainer = document.createElement('div');
//     widgetContainer.id = 'chatbot-widget-container';
//     widgetContainer.style.position = 'fixed';
//     widgetContainer.style.bottom = '0';
//     widgetContainer.style.right = '0';
//     widgetContainer.style.height = '400px';
//     widgetContainer.style.zIndex = '1000';
//     document.body.appendChild(widgetContainer);

//     const chatbotScript = document.createElement('script');
//     chatbotScript.src = `https://bot-rd1k.onrender.com/chatbotLogic.jsx`;
//     chatbotScript.async = true;
//     document.body.appendChild(chatbotScript);

//     chatbotScript.onload = function() {
//       if (typeof window.initChatbot === 'function') {
//         window.initChatbot({ eid });
//       }
//     };
//   }

//   initializeWidget();
// })();
