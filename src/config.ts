import 'dotenv/config';
import * as StellarSdk from '@stellar/stellar-sdk';

const isTestnet = process.env.STELLAR_NETWORK !== 'mainnet';

export const horizonUrl = process.env.HORIZON_URL as string;
export const networkPassphrase = isTestnet
  ? StellarSdk.Networks.TESTNET
  : StellarSdk.Networks.PUBLIC;