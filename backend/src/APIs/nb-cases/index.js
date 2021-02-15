

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
        Cases.find({}, function(err, cases) {
            console.log(cases);
        });
        res.json("ok");
    }catch (e) {
        res.json({"error" : e})
    }
});


export default router;