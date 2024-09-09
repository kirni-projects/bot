import express from 'express';
import { register, getDomain } from '../controllers/registerController.js';

const router = express.Router();

router.post('/register', register);
router.get('/getdomainurl/:eid', getDomain);

export default router;
