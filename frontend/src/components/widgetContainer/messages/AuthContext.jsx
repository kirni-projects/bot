// src/components/widgetContainer/messages/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../../apiConfig.jsx'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://bot-rd1k.onrender.com/api/chat/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.success) {
          setUser({ ...response.data.user, token });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error checking logged in user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useAuthContext = () => useContext(AuthContext);