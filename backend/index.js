import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import {MentalHealthsparse} from "./src/util/csv-parse.js";
import live_cases_API from './src/APIs/cases/index.js';
import mentalHealth_API from './src/APIs/MentalHealth/index.js';
import  nb_cases_API from './src/APIs/nb-cases/index.js';



const app = express();

mongoose.connect("mongodb+srv://user:ws123@cluster0.zadzd.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(()=>{
    console.log(`connection to database established`);
   // MentalHealthsparse() ;
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/cases', live_cases_API);
app.use('/mentalHealth', mentalHealth_API);
app.use('/nbcases', nb_cases_API);

const port = 3001;


app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});

export { app }