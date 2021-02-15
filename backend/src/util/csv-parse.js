import csv from 'csv-parser';
import fs from 'fs';
import { Cases } from '../models/casesModel.js';
const results = [];

const parse = () => {
  fs.createReadStream('res/data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            results.forEach(test => {
                if( test.granularite==="region"){
                    const toSave = new Cases({ date: test.date, region: test.maille_nom, cas_confirmes : test.cas_confirmes  });
                    toSave.save();
                }

            })
        });
};

export { parse }