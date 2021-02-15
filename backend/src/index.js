import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Casesparse } from './util/csv-parse.js';
import cases_API from './APIs/index.js';
import mentalHealth_API from './APIs/index.js';


const app = express();

mongoose.connect("mongodb+srv://user:ws123@cluster0.zadzd.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(()=>{
    console.log(`connection to database established`);
    Casesparse() ;
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', cases_API);
app.use('/', mentalHealth_API);

const port = 3001;


app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});

export { app }