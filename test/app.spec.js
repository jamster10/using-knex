'use strict';
/* global request */

const app = require('../src/app');

describe('GET /', () => {
  it('Responds to homepage request', () => {
    return request(app)
      .get('/')
      .expect(200, 'Hello, Boilerplate!');
  });




});
