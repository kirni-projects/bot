document.addEventListener("DOMContentLoaded", function () {
  const scriptTag = document.querySelector('script[src*="widget.js"]'); // Locate the script tag by its src attribute

  if (!scriptTag) {
    console.error('Script tag not found');
    return;
  }

  const elementId = scriptTag.getAttribute("data-id"); // Get the element ID from the script tag's data-id attribute
  
  if (elementId) {
    const waitForRenderFunction = () => {
      if (typeof window.renderChatWidget === 'function') {
        // Call the globally available renderChatWidget function
        window.renderChatWidget(elementId);
      } else {
        console.warn('renderChatWidget is not yet defined, retrying...');
        setTimeout(waitForRenderFunction, 100); // Retry after 100ms if the function is not defined yet
      }
    };

    waitForRenderFunction(); // Start checking for the function
  } else {
    console.error('data-id attribute not found on the script tag');
  }
});
