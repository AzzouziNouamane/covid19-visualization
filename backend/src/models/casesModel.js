import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var CasesNumbersSchema = new Schema({
    date: { type: String, required: true, max: 100 },
    region: { type: String, required: true },
    cas_confirmes: { type: String, required: false}
});

export const Cases = mongoose.model('Cases', CasesNumbersSchema);