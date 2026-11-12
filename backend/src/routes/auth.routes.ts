import { Router } from 'express';
import { login, logout, me } from '../controllers/auth.controller.js';
import { checkAdminLockout } from '../middlewares/rateLimiter.middleware.js';

const router = Router();

router.post('/auth/login', checkAdminLockout, login);
router.post('/auth/logout', logout);
router.get('/auth/me', me);

export default router;
