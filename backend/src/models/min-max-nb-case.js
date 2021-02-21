import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MinMaxSchema= new Schema({
    min:{type: Number, required: true},
    max:{type: Number, required: true}

});

export const MinMax = mongoose.model('MinMaxNbCases', MinMaxSchema);