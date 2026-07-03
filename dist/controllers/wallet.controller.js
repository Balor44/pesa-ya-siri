"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemCard = exports.sendMoney = exports.getBalance = exports.createWallet = void 0;
const zcash_service_1 = require("../wallet/zcash.service");
const users = [];
const createWallet = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ error: 'phone is required' });
            return;
        }
        const existing = users.find(u => u.phone === phone);
        if (existing) {
            res.status(409).json({ error: 'Wallet already exists' });
            return;
        }
        const wallet = await zcash_service_1.ZcashService.generateAddress();
        const user = { phone, wallet, balance: 10 };
        users.push(user);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createWallet = createWallet;
const getBalance = async (req, res) => {
    try {
        const { phone } = req.params;
        const user = users.find(u => u.phone === phone);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ wallet: user.wallet, balance: user.balance.toFixed(4) + ' ZEC' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getBalance = getBalance;
const sendMoney = async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        if (!from || !to || !amount) {
            res.status(400).json({ error: 'from, to, and amount are required' });
            return;
        }
        const sender = users.find(u => u.phone === from);
        const receiver = users.find(u => u.phone === to);
        if (!sender) {
            res.status(404).json({ error: 'Sender not found' });
            return;
        }
        if (!receiver) {
            res.status(404).json({ error: 'Recipient not found' });
            return;
        }
        const amt = parseFloat(amount);
        if (isNaN(amt) || amt <= 0) {
            res.status(400).json({ error: 'Invalid amount' });
            return;
        }
        if (sender.balance < amt) {
            res.status(400).json({ error: 'Insufficient balance' });
            return;
        }
        sender.balance -= amt;
        receiver.balance += amt;
        const txid = await zcash_service_1.ZcashService.sendZEC(sender.wallet, receiver.wallet, amt);
        res.json({ status: 'success', txid });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.sendMoney = sendMoney;
const redeemCodes = [
    { code: '483838292929', amount: 0.4, used: false },
    { code: '111222333444', amount: 1.0, used: false },
    { code: '999888777666', amount: 2.5, used: false },
];
const redeemCard = async (req, res) => {
    try {
        const { phone, code } = req.body;
        if (!phone || !code) {
            res.status(400).json({ error: 'phone and code are required' });
            return;
        }
        const user = users.find(u => u.phone === phone);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const card = redeemCodes.find(c => c.code === code && !c.used);
        if (!card) {
            res.status(404).json({ error: 'Invalid or already used code' });
            return;
        }
        card.used = true;
        user.balance += card.amount;
        res.json({
            credited: card.amount.toFixed(1) + ' ZEC',
            newBalance: user.balance.toFixed(4) + ' ZEC',
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.redeemCard = redeemCard;
