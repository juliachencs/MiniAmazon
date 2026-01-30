import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI;

    if (!URI) {
      throw new Error('Database URI not defined');
    }

    await mongoose.connect(URI);

    console.log('Database mounted');
  } catch (error) {
    console.error('Database connection failed');
    // force shut server if DB connection fails
    process.exit(1);
  }
};

export default connectDB;