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
    // Allow localhost and production URL in development
    if (!origin || origin === process.env.PRODUCTION_URL || origin.includes("localhost")) {
      return callback(null, true);
    }

    try {
      // Dynamically fetch the allowed domains from your database
      const allowedDomains = await User.find({}, 'domainURL').then(users =>
        users.map(user => user.domainURL)
      );

      // Add a hardcoded domain for testing purposes
      allowedDomains.push("https://scriptdemo.imageum.in");

      if (allowedDomains.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } catch (error) {
      console.error('Error fetching allowed domains for CORS:', error);
      callback(new Error('Internal server error during CORS check'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply CORS middleware to your routes
app.use(cors(corsOptions));

// Apply CORS middleware
app.use('/api', cors(corsOptions), registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes);

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