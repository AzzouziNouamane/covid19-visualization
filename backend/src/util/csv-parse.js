import csv from 'csv-parser';
import fs from 'fs';
import { Test } from '../models/test.js';
const results = [];

const testParse = () => {
    fs.createReadStream('res/db_test.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            results.forEach(test => {
                const toSave = new Test({ str: test.str, numb: test.numb });
                toSave.save();
            })
        });
}

export { testParse }