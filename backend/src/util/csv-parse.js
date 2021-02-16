import csv from 'csv-parser';
import fs from 'fs';
import { Cases } from '../models/casesModel.js';
const results = [];


const parse = async () => {
  fs.createReadStream('res/data2.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            for (const stat of results) {
                console.log(stat);
                let month = stat.jour.split('/')[0];
                    let year = stat.jour.split('/')[2];
                    let date = month +"-"+ year;
                    const cases = await Cases.findOne({"date" : date});
                    let nb_cases = 0;
                    console.log(stat.positif);
                    if((stat.positif !== undefined) && (stat.positif !== null) && (stat.positif !=="")){
                        nb_cases = parseFloat( stat.positif)
                    }else {
                        nb_cases = 0;
                    }
                    if(cases !== null){
                        const region = await cases.regions.find(element => element.regionId === stat.reg);

                        if (region !== undefined){
                            console.log("set" + "   region" + stat.reg + "    date:"+ date);
                            let newCases = region.newCases + nb_cases;

                           let modified= await Cases.findOneAndUpdate({ "regions._id": region._id, "regions.regionId": stat.reg}, {"regions.$.newCases": newCases});

                            console.log("modified set :"+ modified)
                        }else {
                            console.log("push" + "   region" + stat.reg + "    date:"+ date);
                            let data = {
                                "regionId": stat.reg,
                                "newCases":nb_cases
                            };

                            let modified = await Cases.findOne({date: date}, function (err, item) {
                                if (err) {
                                    reject(err);
                                } else {
                                    item.regions.push(data);
                                    item.save().then((result) => {
                                        console.log(result)
                                    }).catch((err) => {
                                        reject(err)
                                    });
                                }
                            }).catch((err) => {
                                console.log(err)
                            });

                            console.log("modified set :"+ modified)


                        }
                    }else {
                        let data = [{
                            "regionId": stat.reg,
                            "newCases":nb_cases
                        }];
                        const toSave = new Cases({ date: date, regions : data });
                        await toSave.save();
                    }

                }


        });
};

export { parse }