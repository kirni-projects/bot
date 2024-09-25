// utils/generateScript.js
export const generateEmbedScript = (userId, eid) => {
    const scriptDomain = process.env.NODE_ENV === 'production' 
      ? process.env.PRODUCTION_URL 
      : 'http://localhost:3000';
    
    const scriptUrl = `${scriptDomain}/widget.jsx`;
    const dataId = `chatbot-${userId}`;
    
    return `<script type='module' src='${scriptUrl}' data-id='${dataId}' eid='${eid}'></script>`;
  };
  