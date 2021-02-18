import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var MentalHealthSchema = new Schema(
    {

        periode: { type: String, required: true, default : "xxxxx" },
        region :{ type: String, required: true },
        anxiete: { type: String, required: true , default : "0"},
        depression: { type: String, required: true , default : "0"},
        pbsommeil: { type: String, required: true, default : "0"}
    }

);

export const MentalHealth = mongoose.model('MentalHealth', MentalHealthSchema);