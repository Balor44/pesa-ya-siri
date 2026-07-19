import { Router } from 'express';
import { buyAirtime, payCable } from '../controllers/billpay.controller';

const router = Router();
router.post('/buy-airtime', buyAirtime);
router.post('/pay-cable', payCable);
export default router;