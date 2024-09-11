import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import User from './models/User.js'; // Assuming User model is where domainURL is stored

dotenv.config();

const app = express();
app.use(express.json());

// Custom CORS middleware to dynamically allow domains based on user-registered domains
app.use(async (req, res, next) => {
  const origin = req.get('Origin');

  if (origin) {
    try {
      // Check if the origin matches any registered domain
      const user = await User.findOne({ domainURL: origin });

      if (user) {
        // If the origin matches the user's domain, allow it
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
    } catch (error) {
      console.error('Error in CORS middleware:', error);
    }
  }
  // Always pass to next middleware
  next();
});

// Serve static files from the frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use('/api', registerRoutes);
app.use('/api', scriptCheckRoutes);
app.use('/api', authRoutes);

// Connect to MongoDB
connectToMongoDB();

console.log('MONGODB_URI:', process.env.MONGO_DB_URI);

const PORT = process.env.PORT || 5000;

// Serve the frontend's index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
