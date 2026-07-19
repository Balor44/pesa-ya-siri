import { ZcashService } from './zcash.service';
import { StellarService } from './stellar.service';
import { ChainType } from '../models/User';

export function getWalletService(chain: ChainType) {
  switch (chain) {
    case 'zcash': return ZcashService;
    case 'stellar': return StellarService;
    default: throw new Error('Unsupported chain: ' + chain);
  }
}