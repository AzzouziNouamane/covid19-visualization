import express from 'express';
import { MentalHealthsparse } from "../../util/csv-parse.js";
import { MentalHealth } from '../../models/mentalHealthModel.js';
const router = express.Router();



router.post('/parse', (req, res) => {
    try {
        MentalHealthsparse();
        res.json("parsed");
    }catch (e) {
        res.json({"error" : e})
    }
});

router.get('/data', (req, res) => {
        let result = [];
        let dates = ['Vague 1 : 23-25 mars'];
        let elementRegionTab = [];
        let regions = [];
    try {
        MentalHealth.find({}, function(err, rest) {
            rest.forEach(data => {

                if(dates.includes(data.periode)) {

                    let region = {
                        regionId: data.region,
                        anxiete: data.anxiete,
                        depression: data.depression,
                        pbsommeil: data.pbsommeil
                    };
                    elementRegionTab.push(region);
                }

                else {
                    regions.push(elementRegionTab);
                    dates.push(data.periode);
                    elementRegionTab = [];
                }

            });
            regions.push(elementRegionTab);
            for(let i = 0 ; i<dates.length ; i++){
                result.push(
                    {
                        id: i+1,
                        date: formatDate(dates[i]),
                        regions: regions[i]
                    })

            }

            res.json(result);
        });

    }catch (e) {
        res.json({"error" : e})
    }
});

function formatDate(date) {

    let s = date.split(": ");
    return s[1];

}
export default router;