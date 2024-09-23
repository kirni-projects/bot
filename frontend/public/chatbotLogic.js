(function() {
  // Ensure the script doesn't use imports directly
  function initChatbot(eid) {
    const widgetContainer = document.getElementById('chatbot-widget-container');
    if (!widgetContainer) return;

    const root = ReactDOM.createRoot(widgetContainer);
    root.render(
      React.createElement(React.StrictMode, null, React.createElement(widgetContainer, { eid }))
    );
  }

  // Attach chatbot initialization to the global scope
  window.initChatbot = function({ eid }) {
    initChatbot(eid);
  };
})();
