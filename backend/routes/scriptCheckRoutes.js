import express from 'express';
import { checkScript } from '../controllers/scriptCheckController.js';

const router = express.Router();

router.get('/proxy/check-script', checkScript);

export default router;
