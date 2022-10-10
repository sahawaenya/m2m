const request = require("supertest");
// const { response } = require("../index");
const { hashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const app = require("../app");
const { sequelize } = require("../models"); /// ini buat
const { queryInterface } = sequelize;

let registerUser;
beforeAll(async () => {
  registerUser = {
    name: "testing",
    email: "testing@gmail.com",
    password: "password",
    bio: "tes register user",
  };
  let users = {
    name: "test",
    email: "test@gmail.com",
    password: hashPassword("password"),
    bio: "Saya suka bermain futsal dan saya adalah Manchunian",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await queryInterface.bulkInsert("Users", [users]);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("/login", () => {
  const userLog = { email: "test@gmail.com", password: "password" };
  test("/login successful", async () => {
    const response = await request(app).post("/login").send(userLog);
    // console.log(response._body, "<<< ini response user login");
    // console.log(response.body, "<<<<");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("/login failed wrong email", async () => {
    const userInput = { email: "cek@mail.com", password: "password" };
    const response = await request(app).post("/login").send(userInput);
    expect(response.status).toBe(400);
  });
  test("/login failed wrong password", async () => {
    const userInput = { email: "khansa@gmail.com", password: "pas" };
    const response = await request(app).post("/login").send(userInput);
    expect(response.status).toBe(400);
  });
});

describe("/register", () => {
  test("/register succes", async () => {
    const response = await request(app).post("/register").send(registerUser);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("/register name empty", async () => {
    registerUser.name = "";
    const response = await request(app).post("/register").send(registerUser);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("/register email empty", async () => {
    registerUser.email = "";
    const response = await request(app).post("/register").send(registerUser);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});
