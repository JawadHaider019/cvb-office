import { Router } from 'express';
import { createRequest, getRequests, updateRequest, deleteRequest, exportCsv, } from '../controllers/requests.controller.js';
import { antiSpamCheck } from '../middlewares/antiSpam.middleware.js';
import { requestRateLimiter } from '../middlewares/rateLimiter.middleware.js';
const router = Router();
// Public submission with rate limiting and anti-spam verification
router.post('/requests', requestRateLimiter, antiSpamCheck, createRequest);
// Admin management
router.get('/requests', getRequests);
router.patch('/requests/:id', updateRequest);
router.delete('/requests/:id', deleteRequest);
// CSV Export (supporting both /export and /export/csv)
router.get('/requests/export', exportCsv);
router.get('/requests/export/csv', exportCsv);
export default router;
