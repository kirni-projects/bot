// // backend/server.js
// Import necessary modules
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors middleware
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

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins; you can specify your domain here instead
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use('/api', cors(corsOptions), registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes);
// Serve widget.js from the frontend directory
app.get('/widget.js', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
  res.sendFile(path.resolve(__dirname, '../frontend/dist/widget.js'));
});

// Serve chatbotLogic.js
app.get('/chatbotLogic.js', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
  res.sendFile(path.resolve(__dirname, '../frontend/dist/chatbotLogic.js'));
});

// Serve static assets (like images and CSS)
app.use('/assets', express.static(path.join(__dirname, '../frontend/src/assets')));
app.use('/src', express.static(path.join(__dirname, '../frontend/src')));

// Connect to MongoDB
connectToMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));












// import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectToMongoDB from './db/connectToMongoDB.js';
// import registerRoutes from './routes/registerRoutes.js';
// import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';
// import User from './models/User.js';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// // Get __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(express.json());

// // CORS configuration for API routes
// const corsOptions = {
//   origin: async function (origin, callback) {
//     try {
//       if (!origin || origin === process.env.PRODUCTION_URL) {
//         return callback(null, true);
//       }

//       const allowedDomains = await User.find({}, 'domainURL').then(users =>
//         users.map(user => user.domainURL)
//       );

//       if (allowedDomains.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     } catch (error) {
//       console.error('Error fetching allowed domains for CORS:', error);
//       callback(new Error('Internal server error during CORS check'));
//     }
//   },
//   credentials: true,
// };

// // Apply CORS middleware
// app.use('/api', cors(corsOptions), registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes);
// // Serve widget.js from the frontend directory
// app.get('/widget.js', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.sendFile(path.resolve(__dirname, '../frontend/dist/widget.js'));
// });

// // Serve chatbotLogic.jsx
// app.get('/chatbotLogic.jsx', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.sendFile(path.resolve(__dirname, '../frontend/dist/chatbotLogic.jsx'));
// });

// // Serve static assets (like images and CSS)
// app.use('/assets', express.static(path.join(__dirname, '../frontend/src/assets')));
// app.use('/src', express.static(path.join(__dirname, '../frontend/src')));


// // Serve static files from the frontend
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// // Fallback route to serve index.html for any unhandled routes
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
// });

// // Connect to MongoDB
// connectToMongoDB();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
