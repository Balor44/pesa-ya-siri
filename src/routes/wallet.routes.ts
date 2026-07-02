import { Router } from 'express';
import { createWallet, getBalance } from '../controllers/wallet.controller';

const router = Router();
router.post('/create-wallet', createWallet);
router.get('/balance/:phone', getBalance);
export default router;