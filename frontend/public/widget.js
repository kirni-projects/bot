// This file is served as the widget script
// Grab the necessary info from data attributes
document.addEventListener("DOMContentLoaded", function () {
    const scriptTag = document.currentScript;
    const elementId = scriptTag.getAttribute("data-id");
    
    // Ensure the global function exists (set by the widgetContainer)
    if (window.renderChatWidget) {
      window.renderChatWidget(elementId);
    }
  });
  