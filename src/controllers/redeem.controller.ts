import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { RechargeCardModel } from '../models/RechargeCard';
import { TransactionModel } from '../models/Transaction';

export const redeemCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code) { res.status(400).json({ error: 'phone and code are required' }); return; }
    const user = await UserModel.findOne({ phone });
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    const card = await RechargeCardModel.findOne({ code, used: false });
    if (!card) { res.status(404).json({ error: 'Invalid or already used code' }); return; }
    card.used = true;
    card.usedBy = phone;
    card.usedAt = new Date();
    await card.save();
    user.balance += card.amount;
    await user.save();
    await TransactionModel.create({ from: 'RECHARGE', to: phone, amount: card.amount, txid: 'redeem-' + code, type: 'redeem' });
    res.json({ credited: card.amount.toFixed(1) + ' ZEC', newBalance: user.balance.toFixed(4) + ' ZEC' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};