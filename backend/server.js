import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http'; // Required for socket.io
import { Server } from 'socket.io';  // Import socket.io
import connectToMongoDB from './db/connectToMongoDB.js';
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Apply CORS middleware
app.use(cors({
  origin: 'https://scriptdemo.imageum.in', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

// Serve static files from the frontend (including the widget)
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use('/widget', express.static(path.join(__dirname, '../frontend/dist/widget'),{
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Apply your routes
app.use('/api', registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes);

// Fallback route for React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// Connect to MongoDB
connectToMongoDB();

// Create the HTTP server for Socket.IO
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'https://scriptdemo.imageum.in', // Allow requests from this origin
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Add your socket events here, for example:
  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data);  // Emit the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));  // Change this to listen to the `server` instance








// import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectToMongoDB from './db/connectToMongoDB.js';
// import registerRoutes from './routes/registerRoutes.js';
// import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';
// // import User from './models/User.js';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// // Get __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use(cors({
//   origin: 'https://scriptdemo.imageum.in', // Allow requests from this origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
//   credentials: true, // Allow credentials (cookies, authorization headers)
// }));

// // CORS configuration
// // const corsOptions = {
// //   origin: async function (origin, callback) {
// //     try {
// //       if (!origin || origin === process.env.PRODUCTION_URL) {
// //         return callback(null, true);
// //       }

// //       const allowedDomains = await User.find({}, 'domainURL').then(users =>
// //         users.map(user => user.domainURL)
// //       );

// //       if (allowedDomains.includes(origin)) {
// //         callback(null, true);
// //       } else {
// //         callback(new Error('Not allowed by CORS'));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching allowed domains for CORS:', error);
// //       callback(new Error('Internal server error during CORS check'));
// //     }
// //   },
// //   credentials: true,
// // };

// // Apply CORS middleware
// app.use('/api', cors(corsOptions), registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes);

// // Serve static files from the frontend (including the widget)
// app.use(express.static(path.join(__dirname, '../frontend/dist')));
// app.use('/widget', express.static(path.join(__dirname, '../frontend/dist/widget')));

// // Fallback route for React's index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
// });

// // Connect to MongoDB
// connectToMongoDB();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
