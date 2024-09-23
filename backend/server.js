import cors from 'cors';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Update the allowed domains in the CORS setup
const allowedDomains = [
  process.env.PRODUCTION_URL,  // Add your frontend URL in the .env file
  'https://bot-rd1k.onrender.com',  // Render backend domain
  'http://localhost:3000'  // Local development
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectToMongoDB();

// Serve static files from the frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Routes
app.use('/api', registerRoutes);
app.use('/api', scriptCheckRoutes);
app.use('/api', authRoutes);
app.use('/api', chatRoutes);

// Fallback route to serve index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
