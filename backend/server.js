// backend/server.js
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToMongoDB from './db/connectToMongoDB.js';
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import User from './models/User.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration for API routes
const corsOptions = {
  origin: async function (origin, callback) {
    try {
      // Allow requests from the bot service itself, or if there's no origin (like in Insomnia or Postman)
      if (!origin || origin === process.env.PRODUCTION_URL) {
        return callback(null, true);
      }

      // Fetch allowed domains from the database (based on the registered `domainURL`)
      const allowedDomains = await User.find({}, 'domainURL').then(users =>
        users.map(user => user.domainURL)
      );

      // Check if the origin is in the allowedDomains array
      if (allowedDomains.includes(origin)) {
        callback(null, true); // Allow request if the domain matches
      } else {
        callback(new Error(`CORS policy blocked access from: ${origin}`)); // Block if not allowed
      }
    } catch (error) {
      console.error('Error fetching allowed domains for CORS:', error);
      callback(new Error('Internal server error during CORS check'));
    }
  },
  credentials: true,  // Allow sending cookies with requests if needed
};

// Apply CORS middleware to all API routes
app.use('/api', cors(corsOptions), registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes);

// Serve widget.js with CORS headers
app.get('/widget.js', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins for the widget
  res.sendFile(path.resolve(__dirname, '../frontend/dist/widget.js'));
});

// Serve chatbotLogic.js with CORS headers
app.get('/chatbotLogic.jsx', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins for chatbot logic
  res.sendFile(path.resolve(__dirname, '../frontend/dist/chatbotLogic.jsx'));
});

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback route to serve index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// Connect to MongoDB
connectToMongoDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import cors from 'cors';
// import express from 'express';
// import path from 'path';
// import dotenv from 'dotenv';
// import connectToMongoDB from './db/connectToMongoDB.js';
// import registerRoutes from './routes/registerRoutes.js';
// import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(express.json());

// // Update the allowed domains in the CORS setup
// const allowedDomains = [
//   process.env.PRODUCTION_URL,  // Add your frontend URL in the .env file
//   'https://bot-rd1k.onrender.com',  // Render backend domain
//   'http://localhost:3000'  // Local development
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedDomains.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow credentials (cookies, etc.)
// };

// app.use(cors(corsOptions));

// // Connect to MongoDB
// connectToMongoDB();

// // Serve static files from the frontend
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'frontend/dist')));

// // Routes
// app.use('/api', registerRoutes);
// app.use('/api', scriptCheckRoutes);
// app.use('/api', authRoutes);
// app.use('/api', chatRoutes);

// // Fallback route to serve index.html for any unhandled routes
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'frontend/dist/index.html'));
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
