import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var TestSchema = new Schema({
    test: { type: String, required: true, max: 100 }
});

export const Test = mongoose.model('Test', TestSchema);