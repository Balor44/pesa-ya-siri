import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URL || process.env.MONGODB_URI!;
    if (!uri) {
      console.log('⚠️  No database URI found — running without database');
      return;
    }
    // Add database name to URI directly
    const uriWithDb = uri.replace('mongodb://', 'mongodb://').replace(':27017', ':27017/pesayasiri');
    await mongoose.connect(uriWithDb);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB failed to connect:', error);
    console.log('⚠️  Running without database — data will not persist');
  }
};