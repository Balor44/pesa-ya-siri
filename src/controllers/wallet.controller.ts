import { Request, Response } from 'express';
import { ZcashService } from '../wallet/zcash.service';
import { UserModel } from '../models/User';
import { RechargeCardModel } from '../models/RechargeCard';
import { TransactionModel } from '../models/Transaction';

export const createWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    if (!phone) { res.status(400).json({ error: 'phone is required' }); return; }
    const existing = await UserModel.findOne({ phone });
    if (existing) { res.status(409).json({ error: 'Wallet already exists' }); return; }
    const wallet = await ZcashService.generateAddress();
    const user = await UserModel.create({ phone, wallet, balance: 10 });
    res.status(201).json({ phone: user.phone, wallet: user.wallet, balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.params;
    const user = await UserModel.findOne({ phone });
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
    const sender = await UserModel.findOne({ phone: from });
    const receiver = await UserModel.findOne({ phone: to });
    if (!sender) { res.status(404).json({ error: 'Sender not found' }); return; }
    if (!receiver) { res.status(404).json({ error: 'Recipient not found' }); return; }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) { res.status(400).json({ error: 'Invalid amount' }); return; }
    if (sender.balance < amt) { res.status(400).json({ error: 'Insufficient balance' }); return; }
    sender.balance -= amt;
    receiver.balance += amt;
    await sender.save();
    await receiver.save();
    const txid = await ZcashService.sendZEC(sender.wallet, receiver.wallet, amt);
    await TransactionModel.create({ from, to, amount: amt, txid, type: 'send' });
    res.json({ status: 'success', txid });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

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