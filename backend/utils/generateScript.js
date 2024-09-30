// utils/generateScript.js
export const generateEmbedScript = (userId, eid) => {
  const scriptDomain = process.env.NODE_ENV === 'production' 
    ? process.env.PRODUCTION_URL 
    : 'http://localhost:3000';
  
  const scriptUrl = `${scriptDomain}/widget.js`;
  const dataId = `chat-widget-${userId}`;
  
  return `<script src='${scriptUrl}' data-id='${dataId}' eid='${eid}'></script>`;
};
