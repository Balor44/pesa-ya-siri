"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWaitlistCount = exports.joinWaitlist = void 0;
const Waitlist_1 = require("../models/Waitlist");
const joinWaitlist = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email address' });
            return;
        }
        const existing = await Waitlist_1.WaitlistModel.findOne({ email });
        if (existing) {
            res.status(409).json({
                error: 'Already on the waitlist',
                number: existing.number,
            });
            return;
        }
        const count = await Waitlist_1.WaitlistModel.countDocuments();
        const number = count + 1;
        await Waitlist_1.WaitlistModel.create({ email, number });
        res.status(201).json({
            message: 'You are on the waitlist!',
            number,
            email,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.joinWaitlist = joinWaitlist;
const getWaitlistCount = async (req, res) => {
    try {
        const count = await Waitlist_1.WaitlistModel.countDocuments();
        res.json({ count });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getWaitlistCount = getWaitlistCount;
