const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

describe("/fields", () => {
  test("/fields get successful", async () => {
    const response = await request(app).get("/fields");
    // console.log(response._body, "<<< ini fields");
    expect(response.status).toBe(200);
  });
});
