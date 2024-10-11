import { io } from 'socket.io-client';

let socket;

const getSocket = () => {
  if (!socket) {
    const serverUrl = process.env.NODE_ENV === 'production' 
      ? 'https://bot-rd1k.onrender.com' // Your production server URL
      : 'http://localhost:5000'; // Development environment
    socket = io(serverUrl, {
      transports: ['websocket', 'polling'],  // Fallback to polling if necessary
      withCredentials: true,  // Pass credentials if needed
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