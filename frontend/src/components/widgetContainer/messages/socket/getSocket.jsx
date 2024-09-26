import { io } from 'socket.io-client';

let socket;

const getSocket = () => {
  if (!socket) {
    const serverUrl = process.env.NODE_ENV === 'production' 
      ? 'https://bot-rd1k.onrender.com' // Use your production server URL
      : 'http://localhost:5000'; // Use localhost in development
    socket = io(serverUrl);
  }
  return socket;
};

export default getSocket;
