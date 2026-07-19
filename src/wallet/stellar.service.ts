import * as StellarSdk from '@stellar/stellar-sdk';

const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const server = new StellarSdk.Horizon.Server(HORIZON_URL);
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;

export const StellarService = {

generateAddress: async (): Promise<{ publicKey: string; secret: string }> => {
const pair = StellarSdk.Keypair.random();
return {
publicKey: pair.publicKey(),
secret: pair.secret(),
};
},

fundTestnetAccount: async (publicKey: string): Promise<void> => {
await fetch('https://friendbot.stellar.org?addr=' + encodeURIComponent(publicKey));
},

getBalance: async (publicKey: string): Promise<number> => {
try {
const account = await server.loadAccount(publicKey);
const xlmBalance = account.balances.find((b: any) => b.asset_type === 'native');
return xlmBalance ? parseFloat(xlmBalance.balance) : 0;
} catch (error) {
return 0;
}
},

sendXLM: async (fromSecret: string, toPublicKey: string, amount: number): Promise<string> => {
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
