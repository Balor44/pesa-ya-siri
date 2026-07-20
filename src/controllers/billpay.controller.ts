import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { TransactionModel } from '../models/Transaction';
import { BillPayService } from '../services/billpay.service';
import { getWalletService } from '../wallet';
import { StellarService } from '../wallet/stellar.service';

// Simple TZS-per-unit rate for now — replace with a live XLM/TZS price feed later,
// the same way convertTZStoZEC worked for ZCash.
const XLM_TO_TZS_RATE = 300; // placeholder rate, update with live price feed later

function tzsToXlm(tzsAmount: number): number {
  return tzsAmount / XLM_TO_TZS_RATE;
}

export const buyAirtime = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, targetPhone, amount, network } = req.body;

    if (!phone || !targetPhone || !amount || !network) {
      res.status(400).json({ error: 'phone, targetPhone, amount, and network are required' });
      return;
    }

    const user = await UserModel.findOne({ phone });
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }

    const service = getWalletService(user.chain);
    const liveBalance = await service.getBalance(user.wallet);

    const requiredAmount = user.chain === 'stellar' ? tzsToXlm(amount) : amount; // XLM or native ZEC-equivalent

    if (liveBalance < requiredAmount) {
      res.status(400).json({ error: 'Insufficient balance. Need ' + requiredAmount.toFixed(4) + ' ' + (user.chain === 'stellar' ? 'XLM' : 'ZEC') });
      return;
    }

    const result = await BillPayService.buyAirtime(targetPhone, amount, network);
    if (!result.success) {
      res.status(400).json({ error: result.message });
      return;
    }

    let txid: string;
    if (user.chain === 'stellar') {
      if (!user.secret) { res.status(400).json({ error: 'Wallet missing secret key' }); return; }
      // Operator wallet address should collect airtime payments — placeholder receiving address for now
      const OPERATOR_WALLET = 'GDT5HAB7KDM7WBWVOQJSBT7ACXA43EC5WFJSUB5F74XM57IR5ZKRWG6A';
      txid = await StellarService.sendXLM(user.secret, OPERATOR_WALLET, requiredAmount);
    } else {
      txid = result.reference;
    }

    await TransactionModel.create({
      from: phone, to: 'AIRTIME-' + network, amount: requiredAmount, txid, type: 'send'
    });

    res.json({
      status: 'success',
      reference: result.reference,
      message: result.message,
      deducted: requiredAmount.toFixed(4) + ' ' + (user.chain === 'stellar' ? 'XLM' : 'ZEC'),
      txid,
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
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

    const service = getWalletService(user.chain);
    const liveBalance = await service.getBalance(user.wallet);

    const requiredAmount = user.chain === 'stellar' ? tzsToXlm(amount) : amount;

    if (liveBalance < requiredAmount) {
      res.status(400).json({ error: 'Insufficient balance. Need ' + requiredAmount.toFixed(4) + ' ' + (user.chain === 'stellar' ? 'XLM' : 'ZEC') });
      return;
    }

    const result = await BillPayService.payCableSubscription(smartcardNumber, amount, provider);
    if (!result.success) {
      res.status(400).json({ error: result.message });
      return;
    }

    let txid: string;
    if (user.chain === 'stellar') {
      if (!user.secret) { res.status(400).json({ error: 'Wallet missing secret key' }); return; }
      const OPERATOR_WALLET = 'GDT5HAB7KDM7WBWVOQJSBT7ACXA43EC5WFJSUB5F74XM57IR5ZKRWG6A';
      txid = await StellarService.sendXLM(user.secret, OPERATOR_WALLET, requiredAmount);
    } else {
      txid = result.reference;
    }

    await TransactionModel.create({
      from: phone, to: 'CABLE-' + provider, amount: requiredAmount, txid, type: 'send'
    });

    res.json({
      status: 'success',
      reference: result.reference,
      message: result.message,
      deducted: requiredAmount.toFixed(4) + ' ' + (user.chain === 'stellar' ? 'XLM' : 'ZEC'),
      txid,
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

