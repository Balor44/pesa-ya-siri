import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express from 'express';
import cors from 'cors';
import path from 'path';
import walletRoutes from './routes/wallet.routes';
import transactionRoutes from './routes/transaction.routes';
import redeemRoutes from './routes/redeem.routes';
import messageRoutes from './routes/message.routes';
import adminRoutes from './routes/admin.routes';
import waitlistRoutes from './routes/waitlist.routes'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', walletRoutes);
app.use('/api', transactionRoutes);
app.use('/api', redeemRoutes);
app.use('/api', messageRoutes);
app.use('/api', adminRoutes);
app.use('/api', waitlistRoutes);

app.get('/health', (_req: any, res: any) => {
  res.json({ status: 'OK', product: 'Pesa Ya Siri' });
});

// Serve the React frontend
app.use(express.static(path.join(__dirname, '../public')));
app.get('/{*path}', (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

export default app;