import { io } from 'socket.io-client';

let socket;

const getSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000'); // Update with your server URL
  }
  return socket;
};

export default getSocket;
