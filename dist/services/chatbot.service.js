"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const zcash_service_1 = require("../wallet/zcash.service");
const users = [];
const redeemCodes = [
    { code: '483838292929', amount: 0.4, used: false },
    { code: '111222333444', amount: 1.0, used: false },
    { code: '999888777666', amount: 2.5, used: false },
];
exports.ChatbotService = {
    parse: async (phone, message) => {
        const msg = message.trim().toUpperCase();
        const user = users.find(u => u.phone === phone);
        if (msg === 'CREATE') {
            if (user)
                return 'Wallet already exists: ' + user.wallet.slice(0, 20) + '...';
            const wallet = await zcash_service_1.ZcashService.generateAddress();
            users.push({ phone, wallet, balance: 10 });
            return 'Wallet created! ' + wallet.slice(0, 20) + '... Balance: 10.0000 ZEC';
        }
        if (msg === 'BALANCE') {
            if (!user)
                return 'No wallet found. Send CREATE to register.';
            return 'Balance: ' + user.balance.toFixed(4) + ' ZEC';
        }
        if (msg.startsWith('SEND ')) {
            const parts = msg.split(' ');
            if (parts.length < 3)
                return 'Usage: SEND [phone] [amount]';
            if (!user)
                return 'No wallet. Send CREATE to register.';
            const toPhone = parts[1];
            const amt = parseFloat(parts[2]);
            const receiver = users.find(u => u.phone === toPhone);
            if (!receiver)
                return toPhone + ' is not registered on Pesa Ya Siri.';
            if (isNaN(amt) || amt <= 0)
                return 'Invalid amount.';
            if (user.balance < amt)
                return 'Insufficient balance. You have ' + user.balance.toFixed(4) + ' ZEC.';
            user.balance -= amt;
            receiver.balance += amt;
            const txid = await zcash_service_1.ZcashService.sendZEC(user.wallet, receiver.wallet, amt);
            return 'Sent ' + amt + ' ZEC to ' + toPhone + '. Tx: ' + txid.slice(0, 12) + '... Balance: ' + user.balance.toFixed(4) + ' ZEC';
        }
        if (msg.startsWith('REDEEM ')) {
            const code = msg.split(' ')[1];
            if (!user)
                return 'No wallet. Send CREATE to register.';
            const card = redeemCodes.find(c => c.code === code && !c.used);
            if (!card)
                return 'Invalid or already used code.';
            card.used = true;
            user.balance += card.amount;
            return 'Topped up! ' + card.amount + ' ZEC added. Balance: ' + user.balance.toFixed(4) + ' ZEC';
        }
        if (msg.startsWith('BUY AIRTIME')) {
            const parts = msg.split(' ');
            if (parts.length < 4)
                return 'Usage: BUY AIRTIME [network] [phone] [amount]\nExample: BUY AIRTIME VODACOM 0712345678 5000';
            if (!user)
                return 'No wallet. Send CREATE to register first.';
            const network = parts[2];
            const targetPhone = parts[3];
            const amount = parseFloat(parts[4]);
            if (isNaN(amount) || amount <= 0)
                return 'Invalid amount.';
            return 'Processing airtime purchase... Use the API endpoint /api/buy-airtime to complete this for now.';
        }
        if (msg.startsWith('BUY DSTV') || msg.startsWith('BUY GOTV')) {
            const parts = msg.split(' ');
            if (parts.length < 4)
                return 'Usage: BUY [DSTV/GOTV] [smartcard] [amount]\nExample: BUY DSTV 1234567890 15000';
            if (!user)
                return 'No wallet. Send CREATE to register first.';
            return 'Processing cable payment... Use the API endpoint /api/pay-cable to complete this for now.';
        }
        if (msg === 'HELP') {
            return [
                'Pesa Ya Siri commands:',
                'CREATE - open wallet',
                'BALANCE - check balance',
                'SEND [phone] [amount]',
                'REDEEM [code]',
                'HELP - this menu',
            ].join('\n');
        }
        return 'Unknown command. Send HELP to see all options.';
    },
};
