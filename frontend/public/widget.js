// // frontend/public/widget.js
(function () {
  const scriptDomain = 'https://bot-rd1k.onrender.com';

  // Create and inject the widget's container into the DOM
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'chat-widget-container';
  widgetContainer.style.position = 'fixed';
  widgetContainer.style.bottom = '20px';
  widgetContainer.style.right = '20px';
  widgetContainer.style.zIndex = '10000';
  document.body.appendChild(widgetContainer);

  // Inject React component via ReactDOM
  const script = document.createElement('script');
  script.src = `${scriptDomain}/chatbotLogic.jsx`; // Assuming chatbotLogic is bundled and served as JS
  script.type = 'module'; // Ensure it's treated as a module if using modern ES6 syntax
  widgetContainer.appendChild(script);

  // Inject CSS dynamically for widget styling
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = `${scriptDomain}/src/index.css`; // Use your live URL for the CSS file
  document.head.appendChild(linkElement);
})();











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
