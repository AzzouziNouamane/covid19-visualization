import express from 'express';
const router = express.Router();

import { CasesParsePerDay, CasesParsePerMonth } from '../../util/csv-parse-cases-number.js';


import { Cases } from '../../models/casesModel.js';
import {CasesPerDay} from "../../models/casesModelPerDay.js";
import {MinMax} from "../../models/min-max-nb-case.js";
import { MentalHealth } from '../../models/mentalHealthModel.js';


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

router.get('/data/month/:id', async (req, res) => {
    try {

        let cases = await Cases.find({"regions.regionId": req.params.id});
        let result = [];
        result.push([2020,1,0]);
        cases.forEach(cases =>{
            let nb_cases = cases.regions.find(element => element.regionId === req.params.id).newCases ;
            let month = parseInt(cases.date.split("-")[0]);

            let year = parseInt(cases.date.split("-")[1]);
            let data = [year, month, nb_cases];
            result.push(data);
        });
        res.json(result);



    }catch (e) {
        res.json({"error" : e})
    }
});

router.get('/data/day', (req, res) => {
    try {
        let day_date = new Date(req.body.date);
        CasesPerDay.find({}, function(err, cases) {
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

router.get('/dates', async (req,res) =>{
    try {
        let minMax = await MinMax.find({});
        let startDate = minMax[0].startDate.toString() ;
        res.json({"start": new Date(startDate,), "end": new Date(minMax[0].endDate)});
    }catch (e) {
        res.json({"error" : e})
    }
});






export default router;