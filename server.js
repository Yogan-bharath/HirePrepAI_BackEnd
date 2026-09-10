const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app.js");
const DB = require("./src/config/database.js");

DB();

module.exports = app;