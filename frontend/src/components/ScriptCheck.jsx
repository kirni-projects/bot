import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ScriptCheck = ({ eid }) => {
  const [domainURL, setDomainURL] = useState('');  // Initial state for the domain URL
  const [scriptFound, setScriptFound] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Use useNavigate for navigation

  // Fetch the domain URL using the eid
  useEffect(() => {
    const fetchDomainURL = async () => {
      try {
        const response = await axios.get(`/api/getdomainurl/${eid}`);
        console.log(response.data);  // Check if the correct data is being fetched
        setDomainURL(response.data.domainURL);  // Update the state with the fetched domain URL
      } catch (err) {
        console.error('Error fetching domainURL:', err);
        setError('Failed to fetch domain URL');
      }
    };

    fetchDomainURL();
  }, [eid]);  // Ensure this runs when eid changes

  // Function to check script presence
  const checkScriptPresence = async () => {
    try {
      const response = await axios.get('/api/proxy/check-script', {
        params: { domainURL, eid },  // Pass the domain URL and eid as query params
      });

      setScriptFound(response.data.success);
    } catch (err) {
      console.error('Error checking script presence:', err);
      setError('Failed to check script presence');
    }
  };

  const handleSkip = () => {
    navigate('/login');  // Navigate to the login page on skip
  };

  return (
    <div>
      <h3>Test Script Presence in Domain URL</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Domain URL:</label>
        <input
          type="text"
          value={domainURL}  // Bind the input field to the state variable
          readOnly
        />
      </div>
      <button onClick={checkScriptPresence}>Check Script</button>

      {scriptFound !== null && (
        <div>
          {scriptFound ? (
            <p style={{ color: 'green' }}>Script is correctly embedded on {domainURL}.</p>
          ) : (
            <p style={{ color: 'red' }}>Script is NOT found on {domainURL}.</p>
          )}
        </div>
      )}

      <button onClick={handleSkip}>Skip</button>
    </div>
  );
};

export default ScriptCheck;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ScriptCheck = ({ eid }) => {
//   const [domainURL, setDomainURL] = useState('');
//   const [scriptFound, setScriptFound] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory

//   useEffect(() => {
//     // Fetch the domainURL using the eid
//     const fetchDomainURL = async () => {
//       try {
//         const response = await axios.get(`/api/getdomainurl/${eid}`);
//         setDomainURL(response.data.domainURL);
//       } catch (err) {
//         console.error('Error fetching domainURL:', err);
//         setError('Failed to fetch domain URL');
//       }
//     };
//     fetchDomainURL();
//   }, [eid]);

//   const checkScriptPresence = async () => {
//     try {
//       // Use the backend proxy to check for the script presence
//       const response = await axios.get('/api/proxy/check-script', {
//         params: { domainURL, eid },
//       });

//       setScriptFound(response.data.scriptFound);
//     } catch (err) {
//       console.error('Error checking script presence:', err);
//       setError('Failed to check script presence');
//     }
//   };

//   const handleSkip = () => {
//     navigate('/login'); // Navigate to the login page on skip
//   };

//   return (
//     <div>
//       <h3>Test Script Presence in Domain URL</h3>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div>
//         <label>Domain URL:</label>
//         <input type="text" value={domainURL} readOnly />
//       </div>
//       <button onClick={checkScriptPresence}>Check Script</button>

//       {scriptFound !== null && (
//         <div>
//           {scriptFound ? (
//             <p style={{ color: 'green' }}>Script is correctly embedded on {domainURL}.</p>
//           ) : (
//             <p style={{ color: 'red' }}>Script is NOT found on {domainURL}.</p>
//           )}
//         </div>
//       )}

//       <button onClick={handleSkip}>Skip</button> {/* Skip button to bypass the check */}
//     </div>
//   );
// };

// export default ScriptCheck;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ScriptCheck = ({ domainURL, onSkip }) => {
//     const [scriptExists, setScriptExists] = useState(null);
//     const navigate = useNavigate(); // Use useNavigate instead of useHistory

//     useEffect(() => {
//         const checkScriptPresence = async () => {
//             try {
//                 const response = await axios.get(`https://${domainURL}`);
//                 setScriptExists(response.data.scriptExists); // Expecting { scriptExists: true/false }
//             } catch (error) {
//                 console.error('Error checking script presence:', error);
//                 setScriptExists(false);
//             }
//         };

//         if (domainURL) {
//             checkScriptPresence();
//         }
//     }, [domainURL]);

//     const handleProceed = () => {
//         navigate('/login'); // Redirect to login or another page using navigate
//     };

//     if (scriptExists === null) {
//         return <div>Loading...</div>; // Optionally show a loading state
//     }

//     return (
//         <div>
//             <h3>Script Presence Check</h3>
//             {scriptExists ? (
//                 <p>The embed script is present on your domain.</p>
//             ) : (
//                 <p>The embed script is not found on your domain. Please ensure it's added correctly.</p>
//             )}
//             <button onClick={handleProceed}>Proceed to Login</button>
//             <button onClick={onSkip}>Skip Check</button>
//         </div>
//     );
// };

// export default ScriptCheck;
