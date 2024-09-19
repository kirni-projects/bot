// server.js
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

let cachedAllowedDomains = [];
let cacheTime = Date.now();

const refreshAllowedDomains = async () => {
  try {
    const users = await User.find({}, 'domainURL');
    cachedAllowedDomains = users.map(user => user.domainURL);
    cacheTime = Date.now();
  } catch (error) {
    console.error('Error fetching allowed domains:', error);
  }
};

const corsOptions = {
  origin: async function (origin, callback) {
    if (!origin) {
      return callback(null, true);  // Allow non-browser clients or requests without Origin
    }

    // Refresh cache every 60 seconds (you can adjust this interval)
    if (Date.now() - cacheTime > 60000) {
      await refreshAllowedDomains();
    }

    if (cachedAllowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Initial cache load when server starts
await refreshAllowedDomains();

app.use(cors(corsOptions));

// Serve static files from the frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use('/api', registerRoutes);
app.use('/api', scriptCheckRoutes);
app.use('/api', authRoutes);
app.use('/api', chatRoutes);

// Connect to MongoDB
connectToMongoDB();

console.log('MONGODB_URI:', process.env.MONGO_DB_URI);

const PORT = process.env.PORT || 5000;

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
