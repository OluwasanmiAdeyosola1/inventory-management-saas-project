const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// One inventory record per product in each store
inventorySchema.index(
  { storeId: 1, productId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);