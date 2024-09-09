// public/chatbotLogic.js

// Dummy initialization function (replace with your actual chatbot logic)
function initializeChatbot(containerId, dataId, eid) {
    const container = document.getElementById(containerId);
    if (container) {
      // Create a basic chatbot UI as an example
      container.innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
          <div style="flex: 1; overflow-y: auto; padding: 10px;">
            <p>Welcome to our chatbot! (ID: ${dataId}, EID: ${eid})</p>
          </div>
          <div style="border-top: 1px solid #ccc; padding: 10px;">
            <input type="text" placeholder="Type your message here..." style="width: 100%;" />
          </div>
        </div>  
      `;
    }
  }
  
  // Expose the initializeChatbot function globally
  window.initializeChatbot = initializeChatbot;
  