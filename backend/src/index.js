import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import router from './api.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { testParse } from './util/csv-parse.js';

const app = express();

const mongoServer = new MongoMemoryServer();
mongoose.connect(await mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', router);

const port = 3001;

db.once('open', function() {
    testParse();
    console.log('MongoDB connected!');
    app.listen(port, () => {
        console.log('Server is up and running on port ' + port);
    });
});

export { app }