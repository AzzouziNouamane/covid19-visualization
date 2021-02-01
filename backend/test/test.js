import mongoose from 'mongoose';
import assert from 'assert';
import request from 'supertest';
import { app } from '../src/index.js';
const requestApp = request.agent(app);

describe('Test routes', () => {
    beforeEach(async () => {
        mongoose.connection.db.dropDatabase();
    })

    it('should post Test', async () => {
        const res = await requestApp.post('/test').send({test: 'Test'});
        assert.strictEqual(res.body.data.test, 'Test')
    })
})
