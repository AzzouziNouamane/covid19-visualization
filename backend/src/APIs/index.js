import express from 'express';
import Cases from './cases/index.js';

const router = express.Router();

router.use('/cases', Cases);


export default router;