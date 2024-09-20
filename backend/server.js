import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js'; // Ensure this path is correct
import registerRoutes from './routes/registerRoutes.js';
import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Load environment variables
dotenv.config();

// MongoDB connection
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI); // Updated without deprecated options
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

// CORS setup
const corsOptions = {
  origin: async function (origin, callback) {
    try {
      const allowedDomains = await User.find({}, 'domainURL');  // Use async/await with Mongoose
      const domains = allowedDomains.map(user => user.domainURL);
      
      if (!origin || domains.includes(origin)) {
        return callback(null, true);  // Allow the request if the domain is in the allowed list
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    } catch (error) {
      console.error('Error fetching allowed domains for CORS:', error);
      return callback(new Error('Internal server error'));
    }
  },
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Serve static files from the frontend/dist directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Fallback route to serve index.html for all other requests (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
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









// import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import User from './models/User.js';
// import registerRoutes from './routes/registerRoutes.js';
// import scriptCheckRoutes from './routes/scriptCheckRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';

// // Load .env file
// dotenv.config();
// // Configure CORS
// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow requests from the domains registered in the database
//     User.find({}, 'domainURL', (err, users) => {
//       if (err) {
//         return callback(new Error('Internal server error'));
//       }
//       const allowedDomains = users.map(user => user.domainURL);
      
//       // Allow if origin is in the allowed domains or if no origin (non-browser requests)
//       if (!origin || allowedDomains.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error('Not allowed by CORS'));
//       }
//     });
//   },
//   credentials: true,
// };
// // CORS setup
// // const corsOptions = {
// //   origin: '*', // Adjust this to restrict only specific domains in production
// //   credentials: true,
// // };


// // const corsOptions = {
// //   origin: async function (origin, callback) {
// //     if (!origin) {
// //       return callback(null, true);  // Allow non-browser clients or requests without Origin
// //     }

// //     try {
// //       const allowedDomains = await User.find({}, 'domainURL').then(users => users.map(user => user.domainURL));

// //       if (allowedDomains.includes(origin)) {
// //         callback(null, true);  // Allow if the origin is in the allowed list
// //       } else {
// //         callback(new Error('Not allowed by CORS'));  // Deny if the origin is not allowed
// //       }
// //     } catch (error) {
// //       console.error('Error fetching allowed domains:', error);
// //       callback(new Error('Internal server error'));
// //     }
// //   },
// //   credentials: true  // Allow credentials (cookies, etc.) to be sent
// // };

// // app.use(cors(corsOptions));

// const app = express();
// app.use(express.json());
// app.use(cors(corsOptions));

// // Serve static files
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'frontend/dist')));  // Ensure this serves your frontend build

// // Fallback route to serve the index.html for any unhandled routes
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));  // Ensure this serves your React app correctly
// });

// // Routes
// app.use('/api', registerRoutes);
// app.use('/api', scriptCheckRoutes);
// app.use('/api', authRoutes);
// app.use('/api', chatRoutes);

// // MongoDB connection
// const connectToMongoDB = async () => {
//   try {
//     const uri = process.env.MONGO_DB_URI;
//     if (!uri) {
//       throw new Error('MONGO_DB_URI is not defined');
//     }
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error.message);
//     process.exit(1); // Exit process if MongoDB connection fails
//   }
// };

// // Connect to MongoDB
// connectToMongoDB();

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
