import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { TransactionModel } from '../models/Transaction';
import { ZcashService } from '../wallet/zcash.service';

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