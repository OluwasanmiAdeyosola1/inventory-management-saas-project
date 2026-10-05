const mongoose = require("mongoose");
const env = require("../config/env");

afterAll(async () => {
  await mongoose.connection.close();
});