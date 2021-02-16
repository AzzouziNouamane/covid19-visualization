

import express from 'express';
const router = express.Router();
import { parse } from '../../util/csv-parse.js';
import { Cases } from '../../models/casesModel.js';


router.post('/parse', (req, res) => {
    try {
        parse();
        res.json("parsed");
    }catch (e) {
        res.json({"error" : e})
    }
});

router.get('/', (req, res) => {
    try {
        Cases.find({date : req.body.date}, function(err, cases) {
            res.json(cases);
        });

    }catch (e) {
        res.json({"error" : e})
    }
});


export default router;