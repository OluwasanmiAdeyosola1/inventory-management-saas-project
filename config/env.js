const dotenv = require("dotenv");
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test":".env",
});

const env = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = env;
