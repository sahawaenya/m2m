const request = require("supertest");
// const { response } = require("../index");
// const { hashPassword } = require("../helpers/bcrypt");
// const { createToken } = require("../helpers/jwt");
const app = require("../index");
const { sequelize } = require("../models"); /// ini buat
const { queryInterface } = sequelize;
