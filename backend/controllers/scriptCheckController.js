//controller/scriptCheckController
import axios from 'axios';

export const checkScript = async (req, res) => {
  const { domainURL, eid } = req.query;

  if (!domainURL || !eid) {
    return res.status(400).json({ message: 'domainURL and eid are required' });
  }

  try {
    const formattedURL = domainURL.startsWith('http://') || domainURL.startsWith('https://')
        ? domainURL
        : `https://${domainURL}`;

    const response = await axios.get(formattedURL);

    if (!response.data) {
      throw new Error('No data returned from domain');
    }

    const scriptTagRegex = new RegExp(
      `<script type=['"]module['"] src=['"]${process.env.PRODUCTION_URL}/widget.js['"] data-id=['"]chatbot-[a-fA-F0-9]{24}['"] eid=['"]${eid}['"]></script>`
    );

    const isScriptPresent = scriptTagRegex.test(response.data);

    if (isScriptPresent) {
      return res.status(200).json({ success: true, message: 'Script is present' });
    } else {
      return res.status(404).json({ success: false, message: 'Script not found' });
    }
  } catch (error) {
    console.error('Error checking script:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch domain HTML', error: error.message });
  }
};

//utils/generateScript.js
export const generateEmbedScript = (userId, eid) => {
    const scriptDomain = process.env.NODE_ENV === 'production' 
      ? process.env.PRODUCTION_URL 
      : 'http://localhost:3000';
    
    const scriptUrl = `${scriptDomain}/widget.js`;
    const dataId = `chatbot-${userId}`;
    
    return `<script type='module' src='${scriptUrl}' data-id='${dataId}' eid='${eid}'></script>`;
  };
