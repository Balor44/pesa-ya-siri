"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StellarService = void 0;
const StellarSdk = __importStar(require("@stellar/stellar-sdk"));
const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const server = new StellarSdk.Horizon.Server(HORIZON_URL);
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;
exports.StellarService = {
    generateAddress: async () => {
        const pair = StellarSdk.Keypair.random();
        return {
            publicKey: pair.publicKey(),
            secret: pair.secret(),
        };
    },
    fundTestnetAccount: async (publicKey) => {
        await fetch('https://friendbot.stellar.org?addr=' + encodeURIComponent(publicKey));
    },
    getBalance: async (publicKey) => {
        try {
            const account = await server.loadAccount(publicKey);
            const xlmBalance = account.balances.find((b) => b.asset_type === 'native');
            return xlmBalance ? parseFloat(xlmBalance.balance) : 0;
        }
        catch (error) {
            return 0;
        }
    },
    sendXLM: async (fromSecret, toPublicKey, amount) => {
        const sourceKeypair = StellarSdk.Keypair.fromSecret(fromSecret);
        const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());
        const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: NETWORK_PASSPHRASE,
        })
            .addOperation(StellarSdk.Operation.payment({
            destination: toPublicKey,
            asset: StellarSdk.Asset.native(),
            amount: amount.toFixed(7),
        }))
            .setTimeout(30)
            .build();
        transaction.sign(sourceKeypair);
        const result = await server.submitTransaction(transaction);
        return result.hash;
    },
};
