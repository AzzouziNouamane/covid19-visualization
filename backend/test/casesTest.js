import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
chai.use(chaiHttp);


describe('/GET get data from live cases',  () => {

    it('should return data from the data base liveCases in the world',  (done) => {

        chai.request('http://localhost:3001').get('/cases/liveData').end((err, res) => {
            let data= res.body;
            assert.notEqual(data,undefined);
            done();

        });
    })
});


