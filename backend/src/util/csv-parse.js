import csv from 'csv-parser';
import fs from 'fs';
import { Cases } from '../models/casesModel.js';
import { MentalHealth } from '../models/mentalHealthModel.js';
const results = [];
const resultsMentalHealth = [];


const Casesparse = async () => {
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


const MentalHealthsparse = () => {
    fs.createReadStream('res/coviprev-region.csv')
        .pipe(csv())
        .on('data', (data) => resultsMentalHealth.push(data))
        .on('end', () => {
            console.log(resultsMentalHealth[0]);
            resultsMentalHealth.forEach(test => {
               let depression ;
               let pbsommeil ;
                    if(test.depression == " ") depression="0"
                    else depression=test.depression;

                if(test.pbsommeil == " ") pbsommeil="0"
                else pbsommeil=test.pbsommeil;
                    const toSave = new MentalHealth({
                        periode: test.periode,
                        region : test.region,
                        anxiete: test.anxiete,
                        depression: depression,
                        pbsommeil : pbsommeil

                    });
                    toSave.save();
            })
        });
};

function regionName(number) {
    switch(number) {
        case 11:
            return "Île-de-France";

        case 24:
            return "Centre-Val de Loire";

        case 27:
            return "Bourgogne-Franche-Comté";

        case 28:
            return "Normandie";

        case 32:
            return "Hauts-de-France";

        case 44:
            return "Grand-Est";

        case 52:
            return "Pays de la Loire";

        case 53:
            return "Bretagne";

        case 75:
            return "Nouvelle-Aquitaine";

        case 76:
            return "Occitanie";

        case 84:
            return "Auvergne-Rhône-Alpes";

        case 93:
            return "Provence-Alpes-Côte d'Azur";

        case 94:
            return "Corse";

        default:
            return "erreur";
    }

}

export { Casesparse , MentalHealthsparse }