if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

module.exports = app;
