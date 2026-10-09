const Inventory = require("../models/Inventory");
const Product = require("../models/Product");

// Create inventory for a product
async function createInventory(storeId, productId, quantity = 0) {
  const product = await Product.findOne({
    _id: productId,
    storeId,
  });

  if (!product) {
    throw new Error("Product not found in your store");
  }

  const existingInventory = await Inventory.findOne({
    storeId,
    productId,
  });

  if (existingInventory) {
    throw new Error("Inventory already exists for this product");
  }

  return Inventory.create({
    storeId,
    productId,
    quantity: Number(quantity),
  });
}

// Get all inventory for a store
async function getInventory(storeId) {
  return Inventory.find({ storeId })
    .populate("productId")
    .sort({ createdAt: -1 });
}

// Get inventory for one product
async function getInventoryByProduct(storeId, productId) {
  return Inventory.findOne({
    storeId,
    productId,
  }).populate("productId");
}

// Add stock
async function addStock(storeId, productId, amount) {
  const product = await Product.findOne({
    _id: productId,
    storeId,
  });

  if (!product) {
    throw new Error("Product not found in your store");
  }

  let inventory = await Inventory.findOne({
    storeId,
    productId,
  });

  if (!inventory) {
    inventory = await Inventory.create({
      storeId,
      productId,
      quantity: 0,
    });
  }

  inventory.quantity += Number(amount);

  await inventory.save();

  return inventory;
}

// Remove stock
async function removeStock(storeId, productId, amount) {
  const inventory = await Inventory.findOne({
    storeId,
    productId,
  });

  if (!inventory) {
    throw new Error("Inventory not found");
  }

  if (inventory.quantity < Number(amount)) {
    throw new Error("Insufficient stock");
  }

  inventory.quantity -= Number(amount);

  await inventory.save();

  return inventory;
}

// Update stock directly
async function updateStock(storeId, productId, quantity) {
  const inventory = await Inventory.findOneAndUpdate(
    {
      storeId,
      productId,
    },
    {
      quantity: Number(quantity),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!inventory) {
    throw new Error("Inventory not found");
  }

  return inventory;
}

// Delete inventory
async function deleteInventory(storeId, productId) {
  const inventory = await Inventory.findOneAndDelete({
    storeId,
    productId,
  });

  if (!inventory) {
    throw new Error("Inventory not found");
  }

  return inventory;
}

module.exports = {
  createInventory,
  getInventory,
  getInventoryByProduct,
  addStock,
  removeStock,
  updateStock,
  deleteInventory,
};
