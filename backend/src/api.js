import express from 'express';
import { testPost } from './controller.js';

const router = express.Router();

router.post('/test', testPost);

export default router;