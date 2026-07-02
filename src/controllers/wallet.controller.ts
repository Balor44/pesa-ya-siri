import { Request, Response } from 'express';
import { ZcashService } from '../wallet/zcash.service';

const users: { phone: string; wallet: string; balance: number }[] = [];

export const createWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ error: 'phone is required' });
      return;
    }

    const existing = users.find(u => u.phone === phone);
    if (existing) {
      res.status(409).json({ error: 'A wallet already exists for this number' });
      return;
    }

    const wallet = await ZcashService.generateAddress();
    const user = { phone, wallet, balance: 0 };
    users.push(user);

    res.status(201).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.params;
    const user = users.find(u => u.phone === phone);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      wallet: user.wallet,
      balance: user.balance.toFixed(4) + ' ZEC',
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};