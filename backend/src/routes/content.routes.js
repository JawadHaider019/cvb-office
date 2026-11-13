import { Router } from 'express';
import { getContent, getSettings, getPrices, updateContent, getVersions, restoreVersion, } from '../controllers/content.controller.js';
const router = Router();
// Public data
router.get('/content', getContent);
router.get('/settings', getSettings);
router.get('/prices', getPrices);
// Admin content updates
router.put('/content', updateContent);
// Version history
router.get('/versions/:key', getVersions);
router.post('/versions/restore/:key', restoreVersion);
export default router;
