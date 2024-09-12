import axios from 'axios';

export const checkScript = async (req, res) => {
    const { domainURL, eid } = req.query;

    if (!domainURL) {
        return res.status(400).json({ message: 'domainURL is required' });
    }

    // if (!eid) {
    //     return res.status(400).json({ message: 'eid is required' });
    // }

    try {
        const formattedURL = domainURL.startsWith('http://') || domainURL.startsWith('https://')
            ? domainURL
            : `https://${domainURL}`;

        console.log('Formatted URL:', formattedURL);

        const response = await axios.get(formattedURL);
        console.log('Fetched HTML Content:', response.data);

        // Now find the exact script tag with both 'data-id' and 'eid' in it
        const scriptTagRegex = new RegExp(`<script type=['"]module['"] src=['"]${process.env.PRODUCTION_URL}/widget.js['"] data-id=['"]chatbot-[a-fA-F0-9]{24}['"] eid=['"]${eid}['"]></script>`);
        
        console.log('Regex pattern for Script Tag:', scriptTagRegex);

        const isScriptPresent = scriptTagRegex.test(response.data);

        if (isScriptPresent) {
            return res.status(200).json({ success: true, message: 'Script is present' });
        } else {
            return res.status(404).json({ success: false, message: 'Script not found' });
        }
    } catch (error) {
        console.error('Error fetching domain HTML:', error.message);
        return res.status(500).json({ success: false, message: 'Failed to fetch domain HTML', error: error.message });
    }
};



// import axios from 'axios';

// export const checkScript = async (req, res) => {
//     const { domainURL, eid } = req.query;

//     if (!domainURL) {
//         return res.status(400).json({ message: 'domainURL is required' });
//     }

//     try {
//         const formattedURL = domainURL.startsWith('http://') || domainURL.startsWith('https://')
//             ? domainURL
//             : `https://${domainURL}`; 

//         console.log('Formatted URL:', formattedURL);

//         const response = await axios.get(formattedURL);

//         const scriptTag = `<script type='module' src='${process.env.PRODUCTION_URL}/widget.js' data-id='chatbot-${eid}'></script>`;
//         console.log('Searching for Script Tag:', scriptTag);  // Log the script tag for debugging

//         const isScriptPresent = response.data.includes(scriptTag);

//         if (isScriptPresent) {
//             return res.status(200).json({ success: true, message: 'Script is present' });
//         } else {
//             return res.status(404).json({ success: false, message: 'Script not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching domain HTML:', error.message);
//         return res.status(500).json({ success: false, message: 'Failed to fetch domain HTML', error: error.message });
//     }
// };
