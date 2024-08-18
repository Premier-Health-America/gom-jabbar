const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const { app, server } = require('../app'); // Replace with the correct path to your Express app

after((done) => {
    server.close(); // Close the server after tests are complete
    done();
});

describe('POST /squeeze', () => {
    // Positive Test: Valid cheeseAmount
    it('should squeeze the cheese and return the updated squeezedCheese count', (done) => {
        chai.request(app)
            .post('/api/squeeze')
            .send({ cheeseAmount: 5 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.have.property('message', "Cheese squeezed!"); // Assuming the initial value is 0
                done();
            });
    });

    // Negative Test: Missing or invalid cheeseAmount
    it('should return an error when cheeseAmount is missing or invalid', (done) => {
        chai.request(app)
            .post('/api/squeeze')
            .send({ cheeseAmount: 'notANumber' }) // Or try sending an empty object to simulate missing field
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('error');
                expect(res.body.message).to.equal('Missing required fields: cheeseAmount required');
                done();
            });
    });
});

describe('GET /lyrics', () => {
    it('should return Leonard Cohen lyrics', (done) => {
        chai.request(app)
            .get('/api/lyrics')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.lyrics).to.equal("I'm Your Man");
                done();
            });
    });
});

describe('GET /detect-drunk', () => {
    it('should return a boolean indicating if a person is drunk', (done) => {
        chai.request(app)
            .get('/api/detect-drunk')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('isDrunk').that.is.a('boolean');
                done();
            });
    });
});

describe('POST /cut', () => {
    it('should return Potatoes cut!', (done) => {
        chai.request(app)
            .post('/api/cut')
            .send({size:"1x1"})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal("Potatoes cut!");
                done();
            });
    });
});