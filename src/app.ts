import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express from 'express';
import cors from 'cors';
import walletRoutes from './routes/wallet.routes';
import messageRoutes from './routes/message.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req: any, res: any) => {
  res.json({
    status: 'Pesa Ya Siri is running',
    version: '1.0.0',
  });
});

app.use('/api', walletRoutes);
app.use('/api', messageRoutes);
app.use('/api', adminRoutes);

export default app;