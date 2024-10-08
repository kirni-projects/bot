document.addEventListener("DOMContentLoaded", function () {
  // Select the script tag based on the 'src' attribute or another unique attribute
  const scriptTag = document.querySelector('script[src*="widget.js"]');  // Use the script's src attribute

  // If no script tag is found, log an error and stop execution
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
