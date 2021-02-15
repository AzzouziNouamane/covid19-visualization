import csv from 'csv-parser';
import fs from 'fs';
import { Cases } from '../models/casesModel.js';
import { MentalHealth } from '../models/mentalHealthModel.js';
const results = [];
const resultsMentalHealth = [];

const Casesparse = () => {
  fs.createReadStream('res/data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results);
            results.forEach(test => {
                if( test.granularite==="departement"){
                    const toSave = new Cases({ date: test.date, granularite: test.granularite, maille_nom: test.maille_nom,cas_confirmes : test.cas_confirmes  });
                    toSave.save();
                }

            })
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