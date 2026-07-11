"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMoney = void 0;
const User_1 = require("../models/User");
const Transaction_1 = require("../models/Transaction");
const zcash_service_1 = require("../wallet/zcash.service");
const sendMoney = async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        if (!from || !to || !amount) {
            res.status(400).json({ error: 'from, to, and amount are required' });
            return;
        }
        const sender = await User_1.UserModel.findOne({ phone: from });
        const receiver = await User_1.UserModel.findOne({ phone: to });
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
        await sender.save();
        await receiver.save();
        const txid = await zcash_service_1.ZcashService.sendZEC(sender.wallet, receiver.wallet, amt);
        await Transaction_1.TransactionModel.create({ from, to, amount: amt, txid, type: 'send' });
        res.json({ status: 'success', txid });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.sendMoney = sendMoney;
