import mongoose from 'mongoose';

const RAILWAY_MONGO = 'mongodb://mongo:hvUPBmlwMhiSZryPAgiDkdaFSfAmLSpB@mongodb.railway.internal:27017/pesayasiri?authSource=admin';

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.DATABASE_URL || process.env.MONGO_URL || process.env.MONGODB_URI || RAILWAY_MONGO;

    await mongoose.connect(uri);
    console.log('MongoDB connected to:', uri.split('@')[1]);
  } catch (error) {
    console.error('MongoDB failed to connect:', error);
    console.log('Running without database - data will not persist');
  }
};