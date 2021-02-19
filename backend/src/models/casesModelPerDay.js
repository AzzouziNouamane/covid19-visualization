import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CasesNumbersPerDaySchemas= new Schema({
    date: {type: String, required: true, max: 100},
    regions: [{
        regionId: {type: String, required: true},
        newCases: {type: Number, required: true}
    }
    ]
});

export const CasesPerDay = mongoose.model('CasesPerDay', CasesNumbersPerDaySchemas);