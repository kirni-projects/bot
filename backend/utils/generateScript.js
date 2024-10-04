//utils/generateScript.js
export const generateEmbedScript = (userId, eid) => {
  const scriptDomain = process.env.NODE_ENV === 'production' 
    ? process.env.PRODUCTION_URL 
    : 'http://localhost:3000';

  const scriptUrl = `${scriptDomain}/widget.js`;
  const dataId = `chatbot-${userId}`;

  return `
    <div id="${dataId}"></div>
    <script type='module' src='${scriptUrl}' data-id='${dataId}' eid='${eid}'></script>
  `;
};







// // utils/generateScript.js
// export const generateEmbedScript = (userId, eid) => {
//   const scriptDomain = process.env.NODE_ENV === 'production'
//     ? process.env.PRODUCTION_URL
//     : 'http://localhost:3000';

//   const scriptUrl = `${scriptDomain}/widget.js`;
//   const dataId = `chatbot-${userId}`;

//   // The script that will embed the widget on the domain page
//   return `
//     <script type='module' src='${scriptUrl}' data-id='${dataId}' eid='${eid}'></script>
//     <script>
//       // Wait for DOM content to load
//       document.addEventListener("DOMContentLoaded", function() {
//         // Create the container for the chatbot widget
//         const widgetContainer = document.createElement('div');
//         widgetContainer.id = 'chat-widget-container'; // ID for the widget container
//         document.body.appendChild(widgetContainer); // Append it to the body

//         // Load the widget.js script dynamically if it's not already loaded
//         if (!document.querySelector('script[src="${scriptUrl}"]')) {
//           const widgetScript = document.createElement('script');
//           widgetScript.src = '${scriptUrl}';
//           widgetScript.type = 'module';
//           widgetScript.async = true;
//           document.body.appendChild(widgetScript); // Append the widget script to the body
//         }
//       });
//     </script>`;
// };
