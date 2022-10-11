const request = require("supertest");
const app = require("../app");
const {Field} = require("../models");

beforeEach(() => {
  jest.restoreAllMocks()
})

describe("/fields", () => {
  test("/fields get successful", async () => {
    const response = await request(app).get("/fields");
    expect(response.status).toBe(200);
  });

  test("it should return all fields list", async () => {
    const response = await request(app).get("/fields?category=1");
    expect(response.status).toBe(200);
  });

  test('it should return error', async () => {
    jest.spyOn(Field, 'findAll').mockRejectedValue('Error')
    const response = await request(app).get('/fields');
    expect(response.status).toEqual(500);
  })
});
