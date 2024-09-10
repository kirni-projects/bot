import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ScriptCheck = ({ eid, domainURL }) => { // Receive domainURL as a prop
  const [scriptFound, setScriptFound] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const checkScriptPresence = async () => {
    try {
      // Use the backend proxy to check for the script presence
      const response = await axios.get('/api/proxy/check-script', {
        params: { domainURL, eid },
      });

      setScriptFound(response.data.success); // Use success from the response
    } catch (err) {
      console.error('Error checking script presence:', err);
      setError('Failed to check script presence');
    }
  };

  const handleSkip = () => {
    navigate('/login'); // Navigate to the login page on skip
  };

  return (
    <div>
      <h3>Test Script Presence in Domain URL</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Domain URL:</label>
        <input type="text" value={domainURL} readOnly />
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

      <button onClick={handleSkip}>Skip</button> {/* Skip button to bypass the check */}
    </div>
  );
};

export default ScriptCheck;
