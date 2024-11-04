import { io } from 'socket.io-client';

let socket;

const getSocket = () => {
  if (!socket) {
    const serverUrl = process.env.NODE_ENV === 'production'
      ? 'https://bot-rd1k.onrender.com'  // Use your production URL
      : 'http://localhost:5000';  // Use localhost in development

    socket = io(serverUrl, {
      transports: ['websocket', 'polling'],  // Fallback to polling if necessary
      reconnectionAttempts: 5,  // Retry up to 5 times
      reconnectionDelay: 1000  // 1 second delay between retries
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