import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './api.js';
import { parse } from './util/csv-parse.js';
import API from './APIs/index.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { testParse } from './util/csv-parse.js';

const app = express();

mongoose.connect("mongodb+srv://user:ws123@cluster0.zadzd.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(()=>{
    console.log(`connection to database established`);
    parse() ;
});
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', router);
app.use('/', API);

const port = 3001;


app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});

export { app }