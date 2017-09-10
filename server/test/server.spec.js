const supertest = require('supertest');
const should = require('should');
const app = require('../server.js');

const server = supertest.agent(app);
describe('Default route', () => {
  it('should return `a welcome text` when route is called', (done) => {
    server
      .get('/')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.text
          .should
          .equal('Hello , i am ask-feedback-bot and am here to help you');
        done();
      });
  });
});

describe('Feedback route', () => {
  it('should return `Feedback sent` when text specifies username', (done) => {
    server
      .post('/feedback')
      .send({ text: '@tony you are a good listener' })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.text.should.equal('Feedback sent successfully');
        done();
      });
  });

  it('should return a status of 400 and an error message if text is not supplied', (done) => {
    server
      .post('/feedback')
      .send({})
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.text.should
          .equal('Please specify your feedback in the correct format');
        done();
      });
  });

  it('should deny access when no user is specified', (done) => {
    server
      .post('/feedback')
      .send({ text: 'you are a good listener' })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.text.should
          .equal('Please specify the recipient of this feedback.');
        done();
      });
  });

  it('should return `Sorry your feedback is not in ASK format` when you a profane word is added', (done) => {
    server
      .post('/feedback')
      .send({ text: '@tony you are a fucking bad listener' })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.text.should
          .equal('Sorry your feedback is not in ASK format, make some corrections and resend');
        done();
      });
  });
});

describe('Message-action route', () => {
  it('should return `Access forbidden` and 403 status there is no payload', (done) => {
    server
      .post('/message-action')
      .send({})
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.text.should.equal('Access forbidden');
        done();
      });
  });
});
