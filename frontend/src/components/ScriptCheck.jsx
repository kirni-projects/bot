//src/component/ScriptCheck.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ScriptCheck = ({ eid }) => {
  const [domainURL, setDomainURL] = useState('');
  const [scriptFound, setScriptFound] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Use useNavigate for navigation

  useEffect(() => {
    const fetchDomainURL = async () => {
      try {
        const response = await axios.get(`/api/getdomainurl/${eid}`);
        setDomainURL(response.data.domainURL);  // Update domain URL from the backend response
      } catch (err) {
        console.error('Error fetching domainURL:', err);
        setError('Failed to fetch domain URL');
      }
    };
    fetchDomainURL();
  }, [eid]);

  const checkScriptPresence = async () => {
    try {
      const response = await axios.get('/api/proxy/check-script', {
        params: { domainURL, eid },  // Pass domainURL and eid to check script presence
      });

      setScriptFound(response.data.success);
    } catch (err) {
      console.error('Error checking script presence:', err);
      setError('Failed to check script presence');
    }
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

      <button onClick={() => navigate('/login')}>Skip</button> {/* Skip button */}
    </div>
  );
};

export default ScriptCheck;