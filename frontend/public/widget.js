// Dynamically inject the chatbot widget and load the necessary assets and CSS
(function() {
  // Create a container div for the chatbot widget
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'chat-widget-container'; // Assign an ID to the container
  widgetContainer.style.position = 'fixed';
  widgetContainer.style.bottom = '20px';
  widgetContainer.style.right = '20px';
  widgetContainer.style.zIndex = '10000'; // Ensure the widget is on top of other elements
  document.body.appendChild(widgetContainer); // Append the widget container to the body

  // Load the widget HTML
  const widgetHTML = `
    <div class="chat-widget">
      <div class="chat-avatar">
        <div class="p-4 w-16 rounded-full bg-orange-400">
          <img id="widgetAvatar" src="${process.env.PRODUCTION_URL}/src/assets/icons/sms.png" alt="Chat Icon" />
        </div>
      </div>
      <div id="messageContainer" class="message-container" style="display: none;">
        <!-- Chat message container -->
      </div>
    </div>
  `;
  
  widgetContainer.innerHTML = widgetHTML;

  // Add click event to toggle the message container
  const widgetAvatar = document.getElementById('widgetAvatar');
  const messageContainer = document.getElementById('messageContainer');

  widgetAvatar.addEventListener('click', () => {
    if (messageContainer.style.display === 'none') {
      messageContainer.style.display = 'block';
    } else {
      messageContainer.style.display = 'none';
    }
  });

  // Fetch and inject the chatbot logic
  fetchChatbotLogic();

  function fetchChatbotLogic() {
    const chatbotLogicUrl = `${process.env.PRODUCTION_URL}/chatbotLogic.jsx`; // Update this path
    fetch(chatbotLogicUrl)
      .then(response => response.text())
      .then(html => {
        messageContainer.innerHTML = html; // Inject chatbot HTML
      })
      .catch(err => console.error('Error loading chatbot content:', err));
  }

  // Dynamically load the CSS file
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = `${process.env.PRODUCTION_URL}/src/index.css`; // Link to the CSS file
  document.head.appendChild(linkElement);
})();
