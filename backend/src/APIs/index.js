import express from 'express';
import Cases from './live-cases/index.js';
import nbCases from './nb-cases/index.js';

const router = express.Router();

router.use('/live/cases', Cases);
router.use('/nbcases', nbCases);


export default router;