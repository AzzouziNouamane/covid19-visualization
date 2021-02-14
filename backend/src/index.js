import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './api.js';
import { parse } from './util/csv-parse.js';
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', router);

const port = 3001;


app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});


export { app }