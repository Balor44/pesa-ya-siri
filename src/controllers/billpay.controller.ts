import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { TransactionModel } from '../models/Transaction';
import { BillPayService } from '../services/billpay.service';
import { convertTZStoZEC } from '../utils/price';

export const buyAirtime = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, targetPhone, amount, network } = req.body;

    if (!phone || !targetPhone || !amount || !network) {
      res.status(400).json({ error: 'phone, targetPhone, amount, and network are required' });
      return;
    }

    const user = await UserModel.findOne({ phone });
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }

    const requiredZec = await convertTZStoZEC(amount);
    if (user.balance < requiredZec) {
      res.status(400).json({ error: 'Insufficient balance. Need ' + requiredZec.toFixed(4) + ' ZEC' });
      return;
    }

    const result = await BillPayService.buyAirtime(targetPhone, amount, network);
    if (!result.success) {
      res.status(400).json({ error: result.message });
      return;
    }

    user.balance -= requiredZec;
    await user.save();

    await TransactionModel.create({
      from: phone, to: 'AIRTIME-' + network, amount: requiredZec, txid: result.reference, type: 'send'
    });

    res.json({
      status: 'success',
      reference: result.reference,
      message: result.message,
      deducted: requiredZec.toFixed(4) + ' ZEC',
      newBalance: user.balance.toFixed(4) + ' ZEC',
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const payCable = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, smartcardNumber, amount, provider } = req.body;

    if (!phone || !smartcardNumber || !amount || !provider) {
      res.status(400).json({ error: 'phone, smartcardNumber, amount, and provider are required' });
      return;
    }

    const user = await UserModel.findOne({ phone });
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }

    const requiredZec = await convertTZStoZEC(amount);
    if (user.balance < requiredZec) {
      res.status(400).json({ error: 'Insufficient balance. Need ' + requiredZec.toFixed(4) + ' ZEC' });
      return;
    }

    const result = await BillPayService.payCableSubscription(smartcardNumber, amount, provider);
    if (!result.success) {
      res.status(400).json({ error: result.message });
      return;
    }

    user.balance -= requiredZec;
    await user.save();

    await TransactionModel.create({
      from: phone, to: 'CABLE-' + provider, amount: requiredZec, txid: result.reference, type: 'send'
    });

    res.json({
      status: 'success',
      reference: result.reference,
      message: result.message,
      deducted: requiredZec.toFixed(4) + ' ZEC',
      newBalance: user.balance.toFixed(4) + ' ZEC',
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};