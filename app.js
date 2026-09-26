const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const connectDB = require("./config/database");
const storeRoutes = require("./routes/store.routes");
const errorMiddleware = require("./middleware/error.middleware");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

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