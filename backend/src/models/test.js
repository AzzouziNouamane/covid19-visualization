import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var TestSchema = new Schema({
    str: { type: String, required: true, max: 100 },
    numb: { type: Number, required: true }
});

export const Test = mongoose.model('Test', TestSchema);