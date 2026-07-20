"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stellar_service_1 = require("./src/wallet/stellar.service");
async function createOperatorWallet() {
    console.log('Generating operator wallet...');
    const { publicKey, secret } = await stellar_service_1.StellarService.generateAddress();
    console.log('Funding via Friendbot (testnet)...');
    await stellar_service_1.StellarService.fundTestnetAccount(publicKey);
    console.log('Checking balance...');
    const balance = await stellar_service_1.StellarService.getBalance(publicKey);
    console.log('');
    console.log('=== OPERATOR WALLET CREATED ===');
    console.log('Public Key (address):', publicKey);
    console.log('Secret Key (KEEP PRIVATE):', secret);
    console.log('Balance:', balance, 'XLM');
    console.log('================================');
}
createOperatorWallet().catch(console.error);
