
const external_API = 'https://api.covid19tracking.narrativa.com/api/2020-03-22/country/france';
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', (req, res) => {
    let settings = { method: "Get" };

    fetch(external_API, settings)
        .then(res => res.json())
        .then((json) => {
            // do something with JSON
            res.send(json);
        });
});



export default router;