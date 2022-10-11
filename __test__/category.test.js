const app = require('../app');
const request = require('supertest');
const {Category} = require('../models');

beforeEach(() => {
  jest.restoreAllMocks()
})

describe("GET /categories", () => {
  test('it should return categories list', async () => {
    const response = await request(app).get('/categories')
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  })

  test('it should return error', async () => {
    // User.findAll = jest.fn().mockRejectedValue('Error')

    jest.spyOn(Category, 'findAll').mockRejectedValue('Error')

    const response = await request(app).get('/categories');
    expect(response.status).toEqual(500);
  })
})