const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const connectDB = require("./config/database");
const storeRoutes = require("./routes/store.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "POST route is working",
  });
});

app.use("/api/stores", storeRoutes);

app.use(errorMiddleware);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});