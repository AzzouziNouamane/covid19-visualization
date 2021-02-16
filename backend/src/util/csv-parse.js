import csv from 'csv-parser';
import fs from 'fs';
import { Cases } from '../models/casesModel.js';
const results = [];


const parse = async () => {
  fs.createReadStream('res/data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            for (const stat of results) {
                if( stat.granularite==="region"){
                    let month = stat.date.split('-')[1];
                    let year = stat.date.split('-')[0];
                    let date = month +"-"+ year;
                    let region_code = stat.maille_code.split('-')[1] ;
                    const cases = await Cases.findOne({"date" : date});
                    let nb_cases = 0;
                    console.log(stat.cas_confirmes);
                    if((stat.cas_confirmes !== undefined) && (stat.cas_confirmes !== null) && (stat.cas_confirmes !=="")){
                        nb_cases = parseFloat( stat.cas_confirmes )
                    }else {
                        nb_cases = 0;
                    }
                    if(cases !== null){
                        const region = await cases.regions.find(element => element.regionId === region_code);

                        if (region !== undefined){
                            console.log("set" + "   region" + region_code + "    date:"+ date);
                            let newCases = region.newCases + nb_cases;
                            let modified = await Cases.findOneAndUpdate({"_id" : cases._id, "regions.regionId": region_code},  { $set: { "regions.$.newCases": newCases }},function(err){
                                if(err){
                                    console.log(err);
                                }});
                            console.log("modified set :"+ modified)
                        }else {
                            console.log("push" + "   region" + region_code + "    date:"+ date);
                            let data = {
                                "regionId": region_code,
                                "newCases":nb_cases
                            };
                            let modified = await Cases.findOneAndUpdate({date: date},  { $push: { regions : data }},function(err){
                                if(err){
                                    console.log(err);
                                }});
                            console.log("modified set :"+ modified)


                        }
                    }else {
                        let data = [{
                            "regionId": region_code,
                            "newCases":nb_cases
                        }];
                        const toSave = new Cases({ date: date, regions : data });
                        await toSave.save();
                    }

                }

            }
        });
};

export { parse }