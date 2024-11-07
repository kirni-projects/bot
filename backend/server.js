//server.js
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import connectToMongoDB from './db/connectToMongoDB.js';
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import avatarRoute from './routes/avatarRoute.js';
import { fileURLToPath } from 'url';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Apply CORS middleware with credentials
const corsOptions = {
  origin: 'https://scriptdemo.imageum.in', // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};
app.use(cors(corsOptions));

// Serve static files for the frontend (including the widget)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Serve widget files with explicit headers for CSS and JS
app.use('/widget', express.static(path.join(__dirname, '../frontend/dist/widget'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Set Content-Type explicitly for the main widget JavaScript file
app.use('/widget.js', (req, res, next) => {
  res.setHeader('Content-Type', 'application/javascript');
  next();
}, express.static(path.join(__dirname, '../widget.js')));

// Apply API routes
app.use('/api', registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes, avatarRoute);

// Fallback route for React’s index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// Connect to MongoDB and handle errors
connectToMongoDB().catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit the application if MongoDB connection fails
});

// Create the HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: corsOptions, // Apply CORS options to Socket.IO as well
});

// Expose the io instance for other parts of the app (like controllers)
app.locals.io = io;

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Join room based on userId
  socket.on('joinRoom', (userId) => {
    if (userId) {
      socket.join(userId);
      console.log(`User ${userId} joined room ${userId}`);
    } else {
      console.error("joinRoom event received without a userId");
    }
  });

  // Handle incoming messages and broadcast to the sender's room
  socket.on('message', (message) => {
    if (message && message.sender) {
      io.to(message.sender).emit('message', message);
      console.log(`Message sent to user ${message.sender}`);
    } else {
      console.error("Received message event without sender information");
    }
  });

  // Handle disconnection
  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected: ${reason}`);
  });
});

// Start the server and log any potential startup errors
const PORT = process.env.PORT || 5000;
server.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});












// //server.js
// import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import http from 'http';
// import { Server as SocketIOServer } from 'socket.io';
// import connectToMongoDB from './db/connectToMongoDB.js';
// import registerRoutes from './routes/registerRoutes.js';
// import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';
// import avatarRoute from './routes/avatarRoute.js';
// import { fileURLToPath } from 'url';

// // Get __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(express.json());

// // Apply CORS middleware
// app.use(cors({
//   origin: 'https://scriptdemo.imageum.in', // Your frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
//   credentials: true, // Allow credentials (cookies, authorization headers)
// }));

// // Serve static files from the frontend (including the widget)
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// app.use('/widget', express.static(path.join(__dirname, '../frontend/dist/widget'),{
//   setHeaders: (res, path) => {
//     if (path.endsWith('.css')) {
//       res.setHeader('Content-Type', 'text/css');
//     }
//     if (path.endsWith('.js')) {
//       res.setHeader('Content-Type', 'application/javascript');
//     }
//   }
// }));

// // Set explicit headers for JavaScript files to ensure proper MIME type
// app.use('/widget.js', (req, res, next) => {
//   res.setHeader('Content-Type', 'application/javascript');
//   next();
// }, express.static(path.join(__dirname, '../widget.js')));

// // Apply your routes
// app.use('/api', registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes, avatarRoute);

// // Fallback route for React's index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
// });

// // Connect to MongoDB
// connectToMongoDB();

// // Create the HTTP server for Socket.IO
// // const server = createServer(app);
// const server = http.createServer(app);

// // Initialize Socket.IO
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: 'https://scriptdemo.imageum.in', // Allow your frontend domain
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });
// // Expose the io instance for other parts of the app (like controllers)
// app.locals.io = io;

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('joinRoom', (userId) => {
//     socket.join(userId);
//   });

//   socket.on('message', (message) => {
//     io.to(message.sender).emit('message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));  // Change this to listen to the server instance






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
