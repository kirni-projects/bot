document.addEventListener("DOMContentLoaded", function () {
    // Ensure the script is loaded after the DOM is fully loaded
    const scriptTag = document.currentScript; // Get the current <script> tag
  
    // If document.currentScript is not available, you can also fall back to manual selection
    if (!scriptTag) {
      console.error('Script tag not found');
      return;
    }
  
    const elementId = scriptTag.getAttribute("data-id");
    
    // Ensure the elementId exists before trying to render the widget
    if (elementId) {
      if (window.renderChatWidget) {
        window.renderChatWidget(elementId);  // Call the global function to render the widget
      } else {
        console.error('renderChatWidget function is not defined');
      }
    } else {
      console.error('data-id attribute not found on the script tag');
    }
  });
  
