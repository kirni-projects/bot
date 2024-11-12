document.addEventListener("DOMContentLoaded", function () {
  const scriptTag = document.querySelector('script[src*="widget.js"]');
  const elementId = scriptTag.getAttribute("data-id");

  if (elementId) {
    const waitForRenderFunction = () => {
      if (typeof window.renderChatWidget === 'function') {
        window.renderChatWidget(elementId);
      } else {
        setTimeout(waitForRenderFunction, 100); // Retry every 100ms
      }
    };

    waitForRenderFunction();  // Start polling for the render function
  } else {
    console.error('data-id attribute not found on the script tag');
  }
});





// document.addEventListener("DOMContentLoaded", function () {
//   // Select the script tag by its src attribute
//   const scriptTag = document.querySelector('script[src*="widget.js"]'); 

//   if (!scriptTag) {
//     console.error('Script tag not found');
//     return;
//   }

//   const elementId = scriptTag.getAttribute("data-id"); // Get the element ID from the script tag's data-id attribute

//   if (elementId) {
//     const waitForRenderFunction = () => {
//       if (typeof window.renderChatWidget === 'function') {
//         // Call the globally available renderChatWidget function
//         window.renderChatWidget(elementId);
//       } else {
//         console.warn('renderChatWidget is not yet defined, retrying...');
//         setTimeout(waitForRenderFunction, 100); // Retry after 100ms if the function is not defined yet
//       }
//     };

//     waitForRenderFunction(); // Start checking for the function
//   } else {
//     console.error('data-id attribute not found on the script tag');
//   }
// });
