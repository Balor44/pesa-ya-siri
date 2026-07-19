"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payCable = exports.buyAirtime = void 0;
const User_1 = require("../models/User");
const Transaction_1 = require("../models/Transaction");
const billpay_service_1 = require("../services/billpay.service");
const price_1 = require("../utils/price");
const buyAirtime = async (req, res) => {
    try {
        const { phone, targetPhone, amount, network } = req.body;
        if (!phone || !targetPhone || !amount || !network) {
            res.status(400).json({ error: 'phone, targetPhone, amount, and network are required' });
            return;
        }
        const user = await User_1.UserModel.findOne({ phone });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const requiredZec = await (0, price_1.convertTZStoZEC)(amount);
        if (user.balance < requiredZec) {
            res.status(400).json({ error: 'Insufficient balance. Need ' + requiredZec.toFixed(4) + ' ZEC' });
            return;
        }
        const result = await billpay_service_1.BillPayService.buyAirtime(targetPhone, amount, network);
        if (!result.success) {
            res.status(400).json({ error: result.message });
            return;
        }
        user.balance -= requiredZec;
        await user.save();
        await Transaction_1.TransactionModel.create({
            from: phone, to: 'AIRTIME-' + network, amount: requiredZec, txid: result.reference, type: 'send'
        });
        res.json({
            status: 'success',
            reference: result.reference,
            message: result.message,
            deducted: requiredZec.toFixed(4) + ' ZEC',
            newBalance: user.balance.toFixed(4) + ' ZEC',
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.buyAirtime = buyAirtime;
const payCable = async (req, res) => {
    try {
        const { phone, smartcardNumber, amount, provider } = req.body;
        if (!phone || !smartcardNumber || !amount || !provider) {
            res.status(400).json({ error: 'phone, smartcardNumber, amount, and provider are required' });
            return;
        }
        const user = await User_1.UserModel.findOne({ phone });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const requiredZec = await (0, price_1.convertTZStoZEC)(amount);
        if (user.balance < requiredZec) {
            res.status(400).json({ error: 'Insufficient balance. Need ' + requiredZec.toFixed(4) + ' ZEC' });
            return;
        }
        const result = await billpay_service_1.BillPayService.payCableSubscription(smartcardNumber, amount, provider);
        if (!result.success) {
            res.status(400).json({ error: result.message });
            return;
        }
        user.balance -= requiredZec;
        await user.save();
        await Transaction_1.TransactionModel.create({
            from: phone, to: 'CABLE-' + provider, amount: requiredZec, txid: result.reference, type: 'send'
        });
        res.json({
            status: 'success',
            reference: result.reference,
            message: result.message,
            deducted: requiredZec.toFixed(4) + ' ZEC',
            newBalance: user.balance.toFixed(4) + ' ZEC',
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.payCable = payCable;
