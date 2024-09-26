// // backend/server.js
import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

const frontendDistPath = path.join(__dirname, '../frontend/dist');

// Serve static assets from 'dist' directory
app.use(express.static(frontendDistPath));

// Dynamically serve the chatbotLogic-[hash].js file
app.get('/chatbotLogic.js', (req, res) => {
  const assetsPath = path.join(frontendDistPath, 'assets');
  
  // Find the file that matches 'chatbotLogic-[hash].js'
  fs.readdir(assetsPath, (err, files) => {
    if (err) {
      console.error('Failed to read assets directory:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const chatbotLogicFile = files.find(file => file.startsWith('chatbotLogic') && file.endsWith('.js'));

    if (chatbotLogicFile) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.sendFile(path.join(assetsPath, chatbotLogicFile)); // Serve the correct chatbotLogic.js file
    } else {
      res.status(404).send('File not found');
    }
  });
});

// Serve widget.js
app.get('/widget.js', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(path.join(frontendDistPath, 'widget.js'));
});

// Serve static assets (CSS, images, etc.)
app.use('/assets', express.static(path.join(frontendDistPath, 'assets')));

// Serve API routes
app.use('/api', registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes);

// Serve the React application for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendDistPath, 'index.html'));
});

// Connect to MongoDB
connectToMongoDB();

// Start the server
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
