import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import User from './models/User.js'; // Adjust the path based on your file structure
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();

const app = express();

// Middleware to parse incoming requests
app.use(express.json());

// MongoDB connection
connectToMongoDB();

// CORS Setup
const corsOptions = {
  origin: async function (origin, callback) {
    try {
      // Fetch allowed domains from the database
      const allowedDomains = await User.find({}, 'domainURL');
      const domainList = allowedDomains.map(user => user.domainURL);

      // If no origin or origin is in the allowed domains, proceed
      if (!origin || domainList.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS blocked request from origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    } catch (error) {
      console.error('Error fetching allowed domains for CORS:', error);
      callback(new Error('Internal server error'));
    }
  },
  credentials: true, // Allows cookies and other credentials to be sent
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Routes
app.use('/api', registerRoutes);
app.use('/api', scriptCheckRoutes);
app.use('/api', authRoutes);
app.use('/api', chatRoutes);

// Serve static files from frontend/dist
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Catch-all route for serving the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
