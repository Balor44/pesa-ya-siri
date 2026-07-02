import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { ZcashService } from '../wallet/zcash.service';

export const createWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ error: 'phone is required' });
      return;
    }

    const existing = await UserModel.findOne({ phone });
    if (existing) {
      res.status(409).json({ error: 'A wallet already exists for this number' });
      return;
    }

    const wallet = await ZcashService.generateAddress();
    const user = await UserModel.create({ phone, wallet, balance: 0 });

    res.status(201).json({
      phone: user.phone,
      wallet: user.wallet,
      balance: 0,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};