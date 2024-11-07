// src/components/widgetContainer/messages/socket/getSocket.jsx
import { io } from 'socket.io-client';

let socket;

const getSocket = () => {
  if (!socket) {
    const serverUrl = 'https://bot-rd1k.onrender.com';

    try {
      socket = io(serverUrl, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
        autoConnect: true,  // Ensures it reconnects automatically
      });

      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message);
      });

      socket.on('disconnect', (reason) => {
        console.warn('Socket disconnected:', reason);
        if (reason === 'io server disconnect') {
          // Server disconnected the socket, so we need to reconnect manually
          socket.connect();
        }
      });

      socket.on('reconnect_attempt', (attempt) => {
        console.log(`Socket reconnect attempt: ${attempt}`);
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