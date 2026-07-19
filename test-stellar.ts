import { StellarService } from './src/wallet/stellar.service';

async function test() {
  console.log('Generating address...');
  const { publicKey, secret } = await StellarService.generateAddress();
  console.log('Public Key:', publicKey);
  console.log('Secret:', secret);

  console.log('Funding via Friendbot...');
  await StellarService.fundTestnetAccount(publicKey);

  console.log('Checking balance...');
  const balance = await StellarService.getBalance(publicKey);
  console.log('Balance:', balance, 'XLM');
}

test().catch(console.error);