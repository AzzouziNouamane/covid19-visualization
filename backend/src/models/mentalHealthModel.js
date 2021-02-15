import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var MentalHealthSchema = new Schema(
    {

        periode: { type: String, required: false  },
        region :{ type: String, required: false },
        anxiete: { type: String, required: false },
        depression: { type: String, required: false },
        pbsommeil: { type: String, required: false}
    }

);

export const MentalHealth = mongoose.model('MentalHealth', MentalHealthSchema);