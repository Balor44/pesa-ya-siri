"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = void 0;
const User_1 = require("../models/User");
const zcash_service_1 = require("../wallet/zcash.service");
const createWallet = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ error: 'phone is required' });
            return;
        }
        const existing = await User_1.UserModel.findOne({ phone });
        if (existing) {
            res.status(409).json({ error: 'A wallet already exists for this number' });
            return;
        }
        const wallet = await zcash_service_1.ZcashService.generateAddress();
        const user = await User_1.UserModel.create({ phone, wallet, balance: 0 });
        res.status(201).json({
            phone: user.phone,
            wallet: user.wallet,
            balance: 0,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createWallet = createWallet;
