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

// Helper function to fetch allowed domains from MongoDB
const getAllowedDomains = async () => {
  try {
    const allowedDomains = await User.find({}, 'domainURL').then(users =>
      users.map(user => user.domainURL)
    );
    return allowedDomains;
  } catch (error) {
    console.error('Error fetching allowed domains:', error);
    throw new Error('Failed to fetch allowed domains');
  }
};

// CORS configuration for API routes and widget serving
const corsOptions = {
  origin: async function (origin, callback) {
    try {
      const allowedDomains = await getAllowedDomains();

      // Allow bot URL (internal calls) or domains from the allowed list
      if (!origin || origin === process.env.PRODUCTION_URL || allowedDomains.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } catch (error) {
      callback(new Error('Error during CORS check'));
    }
  },
  credentials: true,
};

// Apply CORS middleware to API routes
app.use('/api', cors(corsOptions), registerRoutes, scriptCheckRoutes, authRoutes, chatRoutes);

// Dynamic CORS for the widget.js file
app.get('/widget.js', async (req, res) => {
  try {
    const allowedDomains = await getAllowedDomains();
    const origin = req.headers.origin;

    if (allowedDomains.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);  // Allow the specific origin dynamically
      res.setHeader('Access-Control-Allow-Methods', 'GET');  // Only allow GET requests
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.sendFile(path.resolve(__dirname, '../frontend/dist/assets/widget.js')); // Serve the widget.js file
    } else {
      res.setHeader('Access-Control-Allow-Origin', '');  // Block other origins
      res.status(403).json({ message: 'CORS policy: This origin is not allowed' });
    }
  } catch (error) {
    console.error('Error serving widget.js:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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
