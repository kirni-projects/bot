// src/components/widgetContainer/messages/socket/getSocket.jsx
import { io } from 'socket.io-client';

let socket;

const getSocket = () => {
  if (!socket) {
    const serverUrl = 'https://bot-rd1k.onrender.com';

    socket = io(serverUrl, {
      transports: ['websocket'],  // Use only websocket transport
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', (reason) => {
      console.warn('Socket disconnected:', reason);
      // Attempt to reconnect if disconnected by server
      if (reason === 'io server disconnect') {
        socket.connect();
      }
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });
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