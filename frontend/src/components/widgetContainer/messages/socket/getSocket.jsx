// src/components/widgetContainer/messages/socket/getSocket.jsx
import { io } from 'socket.io-client';

let socket;

const getSocket = () => {
  if (!socket) {
    const serverUrl = 'https://bot-rd1k.onrender.com';

    try {
      socket = io(serverUrl, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 10, // Retry up to 10 times
        reconnectionDelay: 2000, // 2 seconds delay
      });

      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      socket.on('disconnect', (reason) => {
        console.warn('Socket disconnected:', reason);
      });
    } catch (err) {
      console.error('Error initializing WebSocket:', err);
    }
  }
  return socket;
};

export default getSocket;




// import { io } from 'socket.io-client';

// let socket;

// const getSocket = () => {
//   if (!socket) {
//     const serverUrl = process.env.NODE_ENV === 'production' 
//       ? 'https://bot-rd1k.onrender.com' // Use your production server URL
//       : 'http://localhost:5000'; // Use localhost in development
//     socket = io(serverUrl);
//   }
//   return socket;
// };

// export default getSocket;

//src/components/widgetContainer/messages/socket/getSocket
// import { io } from 'socket.io-client';

// let socket;

// const getSocket = () => {
//   if (!socket) {
//     socket = io('http://localhost:5000'); // Update with your server URL
//   }
//   return socket;
// };

// export default getSocket;