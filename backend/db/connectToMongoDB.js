import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI); // Simply connect without the deprecated options
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectToMongoDB;
