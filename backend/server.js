import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Load .env file
dotenv.config();

// MongoDB connection
const connectToMongoDB = async () => {
  try {
    const uri = process.env.MONGO_DB_URI;
    if (!uri) {
      throw new Error('MONGO_DB_URI is not defined');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process if MongoDB connection fails
  }
};

// CORS setup
const corsOptions = {
  origin: async function (origin, callback) {
    if (!origin) {
      return callback(null, true);  // Allow non-browser clients or requests without Origin
    }

    try {
      const allowedDomains = await User.find({}, 'domainURL').then(users => users.map(user => user.domainURL));

      if (allowedDomains.indexOf(origin) !== -1) {
        callback(null, true);  // Allow the request if the domain is registered
      } else {
        callback(new Error('Not allowed by CORS'));  // Block the request if the domain is not registered
      }
    } catch (error) {
      console.error('Error fetching allowed domains for CORS:', error);
      callback(new Error('Internal server error'));
    }
  },
  credentials: true
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/dist')));  // Ensure this serves your frontend build

// Fallback route to serve the index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));  // Ensure this serves your React app correctly
});

// Routes
app.use('/api', registerRoutes);
app.use('/api', scriptCheckRoutes);
app.use('/api', authRoutes);
app.use('/api', chatRoutes);

// Connect to MongoDB
connectToMongoDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
