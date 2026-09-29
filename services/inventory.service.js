const Inventory = require("../models/Inventory");

// Create inventory for a product
async function createInventory(storeId, productId, quantity = 0) {
  return Inventory.create({
    storeId,
    productId,
    quantity,
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
  const inventory = await Inventory.findOne({
    storeId,
    productId,
  });

  if (!inventory) {
    throw new Error("Inventory not found");
  }

  inventory.quantity += amount;

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

  if (inventory.quantity < amount) {
    throw new Error("Insufficient stock");
  }

  inventory.quantity -= amount;

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
      quantity,
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