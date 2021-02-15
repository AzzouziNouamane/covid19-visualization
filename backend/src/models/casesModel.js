import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var CasesNumbersSchema = new Schema(
    {

    date: { type: String, required: true, max: 100 },
    granularite: { type: String, required: true },
    maille_nom: { type: String, required: true },
    cas_confirmes: { type: String, required: false}
}

);

export const Cases = mongoose.model('Cases', CasesNumbersSchema);