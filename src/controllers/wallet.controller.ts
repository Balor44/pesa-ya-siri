import { Request, Response } from 'express';
import { ZcashService } from '../wallet/zcash.service';

const users: { phone: string; wallet: string; balance: number }[] = [];

export const createWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    if (!phone) { res.status(400).json({ error: 'phone is required' }); return; }
    const existing = users.find(u => u.phone === phone);
    if (existing) { res.status(409).json({ error: 'Wallet already exists' }); return; }
    const wallet = await ZcashService.generateAddress();
    const user = { phone, wallet, balance: 10 };
    users.push(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.params;
    const user = users.find(u => u.phone === phone);
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    res.json({ wallet: user.wallet, balance: user.balance.toFixed(4) + ' ZEC' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const sendMoney = async (req: Request, res: Response): Promise<void> => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || !amount) { res.status(400).json({ error: 'from, to, and amount are required' }); return; }
    const sender = users.find(u => u.phone === from);
    const receiver = users.find(u => u.phone === to);
    if (!sender) { res.status(404).json({ error: 'Sender not found' }); return; }
    if (!receiver) { res.status(404).json({ error: 'Recipient not found' }); return; }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) { res.status(400).json({ error: 'Invalid amount' }); return; }
    if (sender.balance < amt) { res.status(400).json({ error: 'Insufficient balance' }); return; }
    sender.balance -= amt;
    receiver.balance += amt;
    const txid = await ZcashService.sendZEC(sender.wallet, receiver.wallet, amt);
    res.json({ status: 'success', txid });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};