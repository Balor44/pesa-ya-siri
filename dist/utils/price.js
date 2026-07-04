"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTZStoZEC = exports.getZECPrice = void 0;
const axios_1 = __importDefault(require("axios"));
// Fallback price — update this manually every few days
// Current approximate rate: 1 ZEC = 1,200,000 TZS
const FALLBACK_PRICE_TZS = 1200000;
const getZECPrice = async () => {
    try {
        const response = await axios_1.default.get('https://api.coingecko.com/api/v3/simple/price?ids=zcash&vs_currencies=tzs', { timeout: 5000 });
        const priceInTZS = response.data?.zcash?.tzs;
        if (!priceInTZS || isNaN(priceInTZS)) {
            console.log('CoinGecko returned invalid data, using fallback price');
            return FALLBACK_PRICE_TZS;
        }
        return priceInTZS;
    }
    catch (error) {
        console.log('CoinGecko unreachable, using fallback price');
        return FALLBACK_PRICE_TZS;
    }
};
exports.getZECPrice = getZECPrice;
const convertTZStoZEC = async (tzs) => {
    const priceInTZS = await (0, exports.getZECPrice)();
    const margin = 1.05;
    const zec = tzs / (priceInTZS * margin);
    return Math.round(zec * 10000) / 10000;
};
exports.convertTZStoZEC = convertTZStoZEC;
