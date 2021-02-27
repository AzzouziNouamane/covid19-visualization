import express from 'express';
const router = express.Router();
import {Contact} from '../../models/contactForm.js'



router.post('/', async (req, res) => {
    try {
        let toSave = new Contact({name : req.body.name, email : req.body.email, message : req.body.message});
        await toSave.save();
        res.json("added successfully");
    }catch (e) {
        res.json({"error" : e})
    }
});

export default router;