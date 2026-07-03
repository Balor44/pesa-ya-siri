"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZcashService = void 0;
exports.ZcashService = {
    generateAddress: async () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let addr = 'zs1';
        for (let i = 0; i < 76; i++) {
            addr += chars[Math.floor(Math.random() * chars.length)];
        }
        return addr;
    },
    getBalance: async (walletAddress) => {
        return 0;
    },
    sendZEC: async (fromAddr, toAddr, amount) => {
        const chars = 'abcdef0123456789';
        let txid = '';
        for (let i = 0; i < 64; i++)
            txid += chars[Math.floor(Math.random() * chars.length)];
        return txid;
    },
};
