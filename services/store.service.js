const Store = require("../models/Store");

const createStore = async (storeData) => {
  const store = await Store.create(storeData);
  return store;
};

const getStores = async () => {
  const stores = await Store.find().sort({ createdAt: -1 });
  return stores;
};

const getStoreById = async (storeId) => {
  const store = await Store.findById(storeId);

  if (!store) {
    throw new Error("Store not found");
  }

  return store;
};

const updateStore = async (storeId, storeData) => {
  const store = await Store.findByIdAndUpdate(
    storeId,
    storeData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!store) {
    throw new Error("Store not found");
  }

  return store;
};

const deleteStore = async (storeId) => {
  const store = await Store.findByIdAndDelete(storeId);

  if (!store) {
    throw new Error("Store not found");
  }

  return store;
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
};