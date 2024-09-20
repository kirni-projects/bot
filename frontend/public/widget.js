(function () {
  const scriptElement = document.querySelector('script[src*="widget.js"]');
  const dataId = scriptElement.getAttribute('data-id');
  const eid = scriptElement.getAttribute('eid');

  // Fetch the allowed domain from the backend
  async function fetchAllowedDomain() {
    try {
      const response = await fetch(`https://bot-rd1k.onrender.com/api/getdomainurl/${eid}`);
      
      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error(`Failed to fetch domain URL, status code: ${response.status}`);
      }

      const data = await response.json();  // Ensure response is parsed as JSON

      // Check if domainURL exists in the response
      if (!data.domainURL) {
        throw new Error('domainURL not found in the response');
      }

      return data.domainURL;
    } catch (error) {
      console.error('Error fetching domain URL:', error);
      return null;
    }
  }

  async function initializeWidget() {
    const allowedDomain = await fetchAllowedDomain();

    if (!allowedDomain) {
      console.error('Allowed domain could not be fetched.');
      return;
    }

    // Check if the current domain matches the allowed domain
    const currentDomain = window.location.hostname;
    if (currentDomain !== allowedDomain) {
      console.error('Chatbot script is not authorized for this domain.');
      return;
    }

    function createChatbot() {
      const container = document.createElement('div');
      container.id = 'chatbot-container';
      container.style.position = 'fixed';
      container.style.bottom = '0';
      container.style.right = '0';
      container.style.height = '400px';
      container.style.zIndex = '1000';
      document.body.appendChild(container);

      const chatbotScript = document.createElement('script');
      chatbotScript.src = `https://bot-rd1k.onrender.com/chatbotLogic.js`; // No need for localhost or domain in production
      chatbotScript.async = true;
      document.body.appendChild(chatbotScript);

      chatbotScript.onload = function () {
        if (typeof initChatbot === 'function') {
          initChatbot(container.id, dataId, eid);
        }
      };
    }

    if (!document.getElementById('chatbot-container')) {
      createChatbot();
    }
  }

  initializeWidget();
})();
