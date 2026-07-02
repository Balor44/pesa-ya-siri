import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import walletRoutes from './routes/wallet.routes';

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

export default app;