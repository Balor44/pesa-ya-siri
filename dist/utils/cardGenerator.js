"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCards = void 0;
const price_1 = require("./price");
const CARD_DENOMINATIONS = [2000, 5000, 10000, 25000, 50000];
function generateCode() {
    let code = '';
    for (let i = 0; i < 12; i++) {
        code += Math.floor(Math.random() * 10).toString();
    }
    return code;
}
const generateCards = async (denomination, quantity) => {
    if (!CARD_DENOMINATIONS.includes(denomination)) {
        throw new Error('Invalid denomination. Choose from: ' + CARD_DENOMINATIONS.join(', ') + ' TZS');
    }
    const zecAmount = await (0, price_1.convertTZStoZEC)(denomination);
    const cards = [];
    for (let i = 0; i < quantity; i++) {
        cards.push({
            code: generateCode(),
            tzs: denomination,
            zec: zecAmount,
            label: denomination.toLocaleString() + ' TZS = ' + zecAmount + ' ZEC',
        });
    }
    return cards;
};
exports.generateCards = generateCards;
