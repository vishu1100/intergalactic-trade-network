const request = require('supertest');
const app = require('../src/index'); // Adjust the path as needed
const { expect } = require('chai');

describe('GET /api/data/:id', () => {
  it('should return data for a given id', (done) => {
    request(app)
      .get('/api/data/1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id', '1');
        done();
      });
  });
});
