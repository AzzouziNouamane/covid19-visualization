import chai from 'chai';
import chaiHttp from 'chai-http';
import mentalhealth from '../src/APIs/MentalHealth/index.js';
import assert from 'assert';
chai.use(chaiHttp);


describe('/GET data from mentalhealth csv',  () => {

    it('should return data from the data base mentalhealth ',  (done) => {

        chai.request('http://localhost:3001').get('/mentalHealth/data').end((err, res) => {
            let dataNb= res.body.length;
            assert.equal(dataNb,16);
            done();

        });
    })
});


describe("Test the fonction format date", function() {

    it("Should be able to return the right format needed for the date ", async function () {

       assert.deepStrictEqual(mentalhealth.formatDate("23-25 mars"), new Date(2020,2,26));
       assert.deepStrictEqual(mentalhealth.formatDate("30 mars-1 avr"),new Date(2020,3,2));


    });
});
