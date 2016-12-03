const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('the express App', () => {
  it('handles a request to root route', (done) => {
    request(app)
      .get('/')
      .end((err, response) => {
        console.log(response.body);
        assert(response.body.hi === 'there');
      });
  });
});
