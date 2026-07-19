import { Router } from 'express';
import {
  getCurrentPrice,
  convertPrice,
  generateRechargeCards,
} from '../controllers/admin.controller';

const router = Router();

router.get('/admin/price', getCurrentPrice);
router.get('/admin/convert', convertPrice);
router.post('/admin/generate-cards', generateRechargeCards);

export default router;