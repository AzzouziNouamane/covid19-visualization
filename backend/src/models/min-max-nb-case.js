import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MinMaxSchema= new Schema({
    min:{type: Number, required: true},
    max:{type: Number, required: true},
    startDate : {type: String, required: true},
    endDate : {type: String, required: true}


});

export const MinMax = mongoose.model('MinMaxNbCases', MinMaxSchema);