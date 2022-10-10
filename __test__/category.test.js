const app = require('../app');
const request = require('supertest');

describe("GET /categories", () => {
  test('it should return categories list', async () => {
    const response = await request(app).get('/categories')
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  })
})