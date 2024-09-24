(function() {
  const scriptElement = document.querySelector('script[src*="widget.js"]');
  const eid = scriptElement.getAttribute('eid');

  async function fetchAllowedDomain() {
    try {
      console.log('Fetching allowed domain for EID:', eid); // Debugging log
      const response = await fetch(`https://bot-rd1k.onrender.com/api/getdomainurl/${eid}`);
      const data = await response.json();
      console.log('Allowed Domain:', data.domainURL); // Debugging log
      return data.domainURL;
    } catch (error) {
      console.error('Error fetching domain URL:', error);
      return null;
    }
  }

  async function initializeWidget() {
    const allowedDomain = await fetchAllowedDomain();
    const currentDomain = window.location.hostname;

    console.log('Current Domain:', currentDomain); // Debugging log

    if (allowedDomain !== currentDomain) {
      console.error('Chatbot script is not authorized for this domain.');
      return;
    }

    // Create and load React and ReactDOM scripts from CDN
    const reactScript = document.createElement('script');
    reactScript.src = 'https://unpkg.com/react@17/umd/react.production.min.js';
    document.body.appendChild(reactScript);

    const reactDOMScript = document.createElement('script');
    reactDOMScript.src = 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js';
    document.body.appendChild(reactDOMScript);

    // Load chatbot logic after React and ReactDOM
    reactDOMScript.onload = function() {
      const widgetContainer = document.createElement('div');
      widgetContainer.id = 'chatbot-widget-container';
      widgetContainer.style.position = 'fixed';
      widgetContainer.style.bottom = '0';
      widgetContainer.style.right = '0';
      widgetContainer.style.height = '400px';
      widgetContainer.style.width = '300px'; // Ensure visibility
      widgetContainer.style.backgroundColor = '#fff'; // Background color
      widgetContainer.style.zIndex = '1000';
      document.body.appendChild(widgetContainer);

      const chatbotScript = document.createElement('script');
      chatbotScript.type = 'module'; // Specify module type for ES6 imports
      chatbotScript.src = `https://bot-rd1k.onrender.com/chatbotLogic.jsx`; // Load your chatbot logic
      chatbotScript.async = true;
      document.body.appendChild(chatbotScript);

      chatbotScript.onload = function() {
        if (typeof window.initChatbot === 'function') {
          console.log('Initializing chatbot...'); // Debugging log
          window.initChatbot({ eid });
        }
      };
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
