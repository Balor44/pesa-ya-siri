import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    console.log('ENV CHECK - MONGO_URL:', process.env.MONGO_URL ? 'EXISTS' : 'MISSING');
    console.log('ENV CHECK - NODE_ENV:', process.env.NODE_ENV);
    const uri = process.env.MONGO_URL;
    if (!uri) {
      console.log('⚠️  No database URI found — running without database');
      return;
    }
    await mongoose.connect(uri + '/pesayasiri');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB failed to connect:', error);
    console.log('⚠️  Running without database — data will not persist');
  }
};