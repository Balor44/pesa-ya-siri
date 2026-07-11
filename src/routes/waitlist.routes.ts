import { Router } from 'express';
import { joinWaitlist, getWaitlistCount } from '../controllers/waitlist.controller';

const router = Router();
router.post('/waitlist', joinWaitlist);
router.get('/waitlist/count', getWaitlistCount);
export default router;