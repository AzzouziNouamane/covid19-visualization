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

router.get('/data/month/:id', async (req, res) => {
    let mcases = await MentalHealth.find({"region": req.params.id});
    let months = ["jan", "feb", "mars", "avr", "mai", "juin", "juillet", "août", "sept", "oct", "nov", "dec"];
    let result_m = [];
    mcases.forEach( elt => {
        let month = elt.periode.split(" ").pop().split(".")[0] ;
        let month_index = months.indexOf(month)+1;
        if (result_m[month_index] === undefined){
            result_m[month_index] = parseInt(elt.anxiete) + parseInt(elt.depression) + parseInt(elt.pbsommeil);
        } else {
            result_m[month_index] += parseInt(elt.anxiete) + parseInt(elt.depression) + parseInt(elt.pbsommeil);
        }
    });
    let result = [];
    result_m.forEach(elt =>{
        let data = [2020, result_m.indexOf(elt), elt];
        result.push(data);
    });
    return res.json(result);

});

export function formatDate(period) {

    let s = period.split("-");
    let date = s[1].split(" ");
    return new Date(2020,months[date[1]]-1,parseInt(date[0])+1);

}
var months = {
    'Jan' : '1',
    'Feb' : '2',
    'mars' : '3',
    'avr' : '4',
    'mai' : '5',
    'juin' : '6',
    'juillet' : '7',
    'août' : '8',
    'sept.' : '9',
    'oct.' : '10',
    'Nov' : '11',
    'Dec' : '12'
}
export default {router:router , formatDate : formatDate} ;
