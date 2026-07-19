import { Router } from 'express';
import { sendMoney } from '../controllers/transaction.controller';
import { getBalance } from '../controllers/wallet.controller';

const router = Router();
router.get('/balance/:phone', getBalance);
router.post('/send', sendMoney);
export default router;