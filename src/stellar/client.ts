import { Horizon } from '@stellar/stellar-sdk';
import { horizonUrl } from '../config';

export const server = new Horizon.Server(horizonUrl);