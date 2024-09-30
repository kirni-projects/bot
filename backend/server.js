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

const corsOptions = {
  origin: async function (origin, callback) {
    // Allow requests from the specified origin
    if (!origin || origin === process.env.PRODUCTION_URL) {
      return callback(null, true); // Allow your own domain (PRODUCTION_URL)
    }

    try {
      // Fetch allowed domains from the database
      const allowedDomains = await User.find({}, 'domainURL').then(users =>
        users.map(user => user.domainURL)
      );

      // Check if the requesting origin is in the allowed domains
      if (allowedDomains.includes(origin)) {
        callback(null, true); // Allow the request if the origin is in the list
      } else {
        callback(new Error('Not allowed by CORS')); // Block the request
      }
    } catch (error) {
      console.error('Error fetching allowed domains for CORS:', error);
      callback(new Error('Internal server error during CORS check'));
    }
  },
  credentials: true, // If you need to send cookies or authentication information
};

// Apply CORS middleware to your API routes
app.use('/api', cors(corsOptions), registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes);

// Allow CORS for widget.js and chatbotLogic.js as well
app.get('/widget.js', cors(corsOptions), (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins for widget.js
  res.sendFile(path.resolve(__dirname, '../frontend/dist/widget.js'));  // Serve the widget.js file
});

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback route to serve index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// Connect to MongoDB
connectToMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
