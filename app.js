const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const connectDB = require("./config/database");

const storeRoutes = require("./routes/store.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const supplierRoutes = require("./routes/supplier.routes");
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const stockMovementRoutes = require("./routes/stockMovement.routes");
const saleRoutes = require("./routes/sale.routes");

const errorMiddleware = require("./middleware/error.middleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.post("/test", (req, res) => {
    res.json({
        success: true,
        message: "POST route is working",
    });
});

app.use("/api/stores", storeRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/sales", saleRoutes);

app.use(errorMiddleware);

app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
});