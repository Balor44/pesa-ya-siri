import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { RechargeCardModel } from '../models/RechargeCard';
import { TransactionModel } from '../models/Transaction';
import { getWalletService } from '../wallet';
import { StellarService } from '../wallet/stellar.service';
import { ChainType } from '../models/User';

export const createWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    const chain: ChainType = req.body.chain || 'stellar';

    if (!phone) { res.status(400).json({ error: 'phone is required' }); return; }
    const existing = await UserModel.findOne({ phone });
    if (existing) { res.status(409).json({ error: 'Wallet already exists' }); return; }

    const service = getWalletService(chain);
    const result: any = await service.generateAddress();
    const wallet = typeof result === 'string' ? result : result.publicKey;
    const secret = typeof result === 'string' ? undefined : result.secret;

    if (chain === 'stellar') {
      await StellarService.fundTestnetAccount(wallet);
    }

    const user = await UserModel.create({ phone, chain, wallet, secret, balance: 0 });
    res.status(201).json({ phone: user.phone, chain, wallet, balance: user.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.params;
    const user = await UserModel.findOne({ phone });
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }

    const service = getWalletService(user.chain);
    const liveBalance = await service.getBalance(user.wallet);

    res.json({ wallet: user.wallet, chain: user.chain, balance: liveBalance.toFixed(4) + ' ' + (user.chain === 'stellar' ? 'XLM' : 'ZEC') });
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
    if (sender.chain !== receiver.chain) { res.status(400).json({ error: 'Both wallets must be on the same chain' }); return; }

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) { res.status(400).json({ error: 'Invalid amount' }); return; }

    const service = getWalletService(sender.chain);
    let txid: string;

    if (sender.chain === 'stellar') {
      if (!sender.secret) { res.status(400).json({ error: 'Sender wallet missing secret key' }); return; }
      txid = await StellarService.sendXLM(sender.secret, receiver.wallet, amt);
    } else {
      txid = await (service as any).sendZEC(sender.wallet, receiver.wallet, amt);
    }

    await TransactionModel.create({ from, to, amount: amt, txid, type: 'send' });
    res.json({ status: 'success', txid });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
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
    res.json({ credited: card.amount.toFixed(1), newBalance: user.balance.toFixed(4) });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};