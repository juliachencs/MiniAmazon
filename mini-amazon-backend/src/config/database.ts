import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const URI = process.env.MONGO_URI;

    if (!URI) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(URI);

    console.log('Database mounted');
  } catch (error) {
    console.error('Database connection failed');
    // force shut server if DB fails
    process.exit(1);
  }
};