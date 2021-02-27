import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
chai.use(chaiHttp);


describe('/GET get data from nb cases',  () => {

    it('should return data from the data base nb cases',  (done) => {

        chai.request('http://localhost:3001').get('/nbcases/all').end((err, res) => {
            let dataNb= res.body.length;
            assert.equal(dataNb,10);
            done();

        });
    })
});

