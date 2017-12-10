//During test the env variable is set to test
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
let should = chai.should();
chai.use(chaiHttp);

describe('Login', () => {
    describe('/POST Login', () => {
        it('it should not login with wrong email and password', (done) => {
            let payload = {
                email: 'worngemail@bain.com',
                password: 'abc123'
            }
            chai.request(server)
                .post('/login')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.status.should.be.equal(401);
                    done();
                });
        });

        it('it should login with correct email and password', (done) => {
            let payload = {
                email: 'testuser@bain.com',
                password: 'testuser'
            }
            chai.request(server)
                .post('/login')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.be.equal(true);
                    res.body.should.have.property('token');
                    res.body.token.length.should.be.gt(0);
                    done();
                });
        });
    });
});

describe("Provider", () => {
    describe("/GET Providers", () => {
        it('it should not be able to search providers without auth token', (done) => {
            let payload = {
                max_discharges: 11,
                min_discharges: 1,
                max_average_covered_charges: 50000,
                min_average_covered_charges: 40000,
                min_average_medicare_payments: 6000,
                max_average_medicare_payments: 10000,
                state: 'GA'
            }
            chai.request(server)
                .get('/api/providers')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });

    describe("/GET Providers", () => {
        it('it should able to search providers after login, with token', (done) => {
            let payload = {
                max_discharges: 11,
                min_discharges: 1,
                max_average_covered_charges: 50000,
                min_average_covered_charges: 40000,
                min_average_medicare_payments: 6000,
                max_average_medicare_payments: 10000,
                state: 'AL'
            }
            let loginPayload = {
                email: 'testuser@bain.com',
                password: 'testuser'
            }
            chai.request(server)
                .post('/login')
                .send(loginPayload)
                .end((err, res) => {
                    payload.token = res.body.token
                    chai.request(server)
                        .get('/api/providers')
                        .send(payload)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('Array');
                            done();
                        });
                });
        });
    });
})