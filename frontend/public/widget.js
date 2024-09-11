(function() {
    const scriptElement = document.querySelector('script[src*="widget.js"]');
    if (!scriptElement) {
        console.error("Script element with 'widget.js' source not found.");
        return;
    }

    const dataId = scriptElement.getAttribute('data-id');
    const eid = scriptElement.getAttribute('eid');

    // Fetch the allowed domain from the backend
    async function fetchAllowedDomain() {
        try {
            const response = await fetch(`/api/getdomainurl/${eid}`);
            const data = await response.json();
            console.log('Allowed domain fetched:', data.domainURL);
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
        console.log('Current Domain:', currentDomain);
        if (currentDomain !== allowedDomain) {
            console.error('Chatbot script is not authorized for this domain.');
            return;
        }

        function createChatbot() {
            console.log('Creating chatbot container...');

            // Check if chatbot container already exists
            if (document.getElementById('chatbot-container')) {
                console.log('Chatbot container already exists.');
                return;
            }

            // Create chatbot container
            const container = document.createElement('div');
            container.id = 'chatbot-container';
            container.style.position = 'fixed';
            container.style.bottom = '0';
            container.style.right = '0';
            container.style.width = '300px';
            container.style.height = '400px';
            container.style.zIndex = '1000';
            container.style.border = '1px solid #ccc';
            container.style.backgroundColor = '#fff';
            container.style.display = 'block';  // Ensure it's visible
            container.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';
            container.style.borderRadius = '8px';

            document.body.appendChild(container);
            console.log('Chatbot container appended to body.');

            // Load the chatbot logic script
            const chatbotScript = document.createElement('script');
            chatbotScript.src = `/chatbotLogic.js`; // Use relative path for production
            chatbotScript.async = true;
            document.body.appendChild(chatbotScript);

            chatbotScript.onload = function() {
                console.log('Chatbot script loaded successfully.');
                if (typeof initializeChatbot === 'function') {
                    initializeChatbot(container.id, dataId, eid);
                } else {
                    console.error('initializeChatbot function not found.');
                }
            };

            chatbotScript.onerror = function() {
                console.error('Error loading chatbotLogic.js.');
            };
        }

        // Create chatbot if container does not already exist
        createChatbot();
    }

    initializeWidget();
})();
