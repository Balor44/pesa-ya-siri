"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRechargeCards = exports.convertPrice = exports.getCurrentPrice = void 0;
const cardGenerator_1 = require("../utils/cardGenerator");
const price_1 = require("../utils/price");
const getCurrentPrice = async (req, res) => {
    try {
        const priceInTZS = await (0, price_1.getZECPrice)();
        res.json({
            zec: 1,
            tzs: priceInTZS,
            display: '1 ZEC = ' + priceInTZS.toLocaleString() + ' TZS',
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch price' });
    }
};
exports.getCurrentPrice = getCurrentPrice;
const convertPrice = async (req, res) => {
    try {
        const tzs = parseFloat(req.query.tzs);
        if (isNaN(tzs) || tzs <= 0) {
            res.status(400).json({ error: 'Invalid TZS amount' });
            return;
        }
        const zec = await (0, price_1.convertTZStoZEC)(tzs);
        res.json({
            tzs,
            zec,
            display: tzs.toLocaleString() + ' TZS = ' + zec + ' ZEC',
            note: 'Includes 5% margin for price stability',
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Conversion failed' });
    }
};
exports.convertPrice = convertPrice;
const generateRechargeCards = async (req, res) => {
    try {
        const { denomination, quantity } = req.body;
        if (!denomination || !quantity) {
            res.status(400).json({ error: 'denomination and quantity are required' });
            return;
        }
        if (quantity > 1000) {
            res.status(400).json({ error: 'Maximum 1000 cards per batch' });
            return;
        }
        const cards = await (0, cardGenerator_1.generateCards)(denomination, quantity);
        res.json({
            generated: cards.length,
            denomination: denomination.toLocaleString() + ' TZS',
            zecPerCard: cards[0].zec,
            rateUsed: cards[0].label,
            cards,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.generateRechargeCards = generateRechargeCards;
