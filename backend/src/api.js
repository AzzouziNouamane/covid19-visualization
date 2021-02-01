import express from 'express';
import { testGet, testPost } from './controller.js';

const router = express.Router();

router.get('/test', testGet);

router.post('/test', testPost);

export default router;