const supertest = require('supertest');
const should = require('should');
const app = require('../server.js');

const server = supertest.agent(app);

describe('Feedback route', () => {
  it('should return home page', (done) => {
    server
      .post('/feedback')
      .send({ text: '@tony you are a good listener' })
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
        res.status.should.equal(200);
        res.body.message.should.equal('Feedback sent');
        done();
      });
  });
});
