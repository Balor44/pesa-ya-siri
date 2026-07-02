import { Router } from 'express';
import { createWallet, getBalance, sendMoney, redeemCard } from '../controllers/wallet.controller';

const router = Router();
router.post('/create-wallet', createWallet);
router.get('/balance/:phone', getBalance);
router.post('/send', sendMoney);
router.post('/redeem', redeemCard);
export default router;