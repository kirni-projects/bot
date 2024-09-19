// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get('/api/chat/me', {
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







//AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkLoggedInUser = async () => {
//       try {
//         const response = await axios.get('/api/chat/me');
//         if (response.data.success) {
//           console.log("checking logged in user: ",response.data);
//           setUser(response.data.user);
//           navigate('/messages'); // Redirect to messages page if authenticated
//         } else {
//           setUser(null);
//         }
//       } catch (err) {
//         console.error('Error checking logged in user:', err);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkLoggedInUser();
//   }, [navigate]);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => useContext(AuthContext);













// // AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loggedOut, setLoggedOut] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkLoggedInUser = async () => {
//       try {
//         const response = await axios.get('/api/chat/me');
//         if (response.data.success && !loggedOut) {
//           console.log("checking logged in user: ", response.data);
//           if(setUser(response.data.user)){
//             navigate('/messages');
//           }; // Redirect to messages page if authenticated
//         } else {          
//           if(setUser(null)){
//             navigate('/');
//           };
//         }
//       } catch (err) {
//         console.error('Error checking logged in user:', err);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkLoggedInUser();
//   }, [navigate, loggedOut]);

//   const logout = async () => {
//     try {
//       console.log('Logout initiated');
//       const response = await axios.post('/api/chat/logout'); // Send logout request to server
//       if (response.data.success) {
//         console.log('Logout successful');
//         setUser(null); // Clear user state
//         localStorage.removeItem('token'); // Or wherever your token is stored
//         setLoggedOut(true); // Set logged out state to true
//         navigate('/'); // Redirect to login page after logging out
//       } else {
//         console.log('Logout failed', response.data);
//       }
//     } catch (err) {
//       console.error('Error logging out:', err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => useContext(AuthContext);
