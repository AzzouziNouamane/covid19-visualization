import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var CasesNumbersSchema = new Schema(
    {
        date: {type: String, required: true, max: 100},
        regions: [{
            regionId: {type: String, required: true},
            newCases: {type: Number, required: true}
        }
        ]
    }

);

export const Cases = mongoose.model('casespermonths', CasesNumbersSchema);