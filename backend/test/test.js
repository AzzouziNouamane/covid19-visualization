import mongoose from 'mongoose';
import assert from 'assert';
import request from 'supertest';
import { app } from '../src/index.js';
import { testParse } from '../src/util/csv-parse.js';
const requestApp = request.agent(app);

describe('Test routes', () => {
    afterEach(async () => {
        mongoose.connection.db.dropDatabase();
        testParse();
    })

    it('should get Test', async () => {
        const res = await requestApp.get('/test');
        assert.strictEqual(res.body.data.length, 4);
    })

    it('should post Test', async () => {
        const res = await requestApp.post('/test').send({str: 'Test', numb: 0});
        assert.strictEqual(res.body.data.str, 'Test')
    })
})
