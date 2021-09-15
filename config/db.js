const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const MONGOPATH = process.env["MONGOPATH"];

const mongoDb = mongoose.connect(MONGOPATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoDb;
