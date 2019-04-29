const request = require('supertest');
const HttpStatus = require('http-status-codes');

describe('API Tests', () => {

  let app;

  beforeEach(() => {
    app = require('./api');
  });

  describe('update', () => {
    it('Should update existing people', async () => {
        const response = await request(app)
        .put('/api/v1/people/1')
        .type('form')
        .send({ name: 'BB8' });
      
      expect(response.statusCode).toBe(HttpStatus.OK);
    });
    
    it('Should return error code if id do not match', async () => {
      const response = await request(app)
      .put('/api/v1/people/666')
      .type('form')
      .send({ name: 'BB8' });
      
      expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('get', () => {
    it('Should get all people', async () => {
      const response = await request(app)
        .get('/api/v1/people');
        
      expect(response.statusCode).toBe(HttpStatus.OK);
      // eslint-disable-next-line
      expect(response.body.length).toEqual(10);
    });

    it('Should get existing droid people', async () => {
      const response = await request(app)
        .get('/api/v1/people?gender=droid');
        
      expect(response.statusCode).toBe(HttpStatus.OK);
      // eslint-disable-next-line
      expect(response.body.map(p => p.id) ).toEqual([2, 3, 8]);
    });
  });

  it('Should have launch command configured', () => {
    const packageJson = require('../package.json');
    expect(packageJson.scripts['start:rest']).toEqual('node ./api/index.js');
  });
});
