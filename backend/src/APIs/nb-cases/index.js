import express from 'express';
const router = express.Router();

import { CasesParsePerDay, CasesParsePerMonth } from '../../util/csv-parse-cases-number.js';

import { Cases } from '../../models/casesModel.js';
import {CasesPerDay} from "../../models/casesModelPerDay.js";
import {MinMax} from "../../models/min-max-nb-case.js";


router.post('/parse/per/month', async (req, res) => {
    try {
        await CasesParsePerMonth();
        res.json("parsed");
    }catch (e) {
        res.json({"error" : e})
    }
});

router.post('/parse/per/day', async (req, res) => {
    try {

        await CasesParsePerDay();

        res.json("parsed");
    }catch (e) {
        res.json({"error" : e})
    }
});

router.get('/all', (req, res) => {
    try {
        Cases.find({}, function(err, cases) {
            res.json(cases);
        });

    }catch (e) {
        res.json({"error" : e})
    }
});

router.get('/data/month', (req, res) => {
    try {
        Cases.find({date : req.body.date}, function(err, cases) {
            res.json(cases);
        });

    }catch (e) {
        res.json({"error" : e})
    }
});

router.get('/data/day', (req, res) => {
    try {
        let day_date = new Date(req.body.date);
        console.log(day_date);
        CasesPerDay.find({date : day_date}, function(err, cases) {
            res.json(cases);
        });
    }catch (e) {
        res.json({"error" : e})
    }
});


router.get('/minmax', async (req, res) => {
    try {
        let minMax = await MinMax.find({});
        res.json({"min": minMax[0].min, "max": minMax[0].max});
    }catch (e) {
        res.json({"error" : e})
    }
});






export default router;