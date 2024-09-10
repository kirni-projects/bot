import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

// Resolve the correct path to the .env file in the root directory
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(express.json());

// Add CORS middleware to allow requests from your domain
app.use(cors({
  origin: 'https://bot-rd1k.onrender.com', // Replace with your domain
  credentials: true,
}));

// Serve static files from the frontend
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
