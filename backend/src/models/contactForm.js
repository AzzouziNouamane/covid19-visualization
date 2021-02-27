import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var ContactForm = new Schema(
    {
        name: { type: String, required: true, max: 100 },
        email: { type: String, required: true, max:100 },
        message: { type: String, required: true, max:400 },
    }

);

export const Contact = mongoose.model('contactForm', ContactForm);