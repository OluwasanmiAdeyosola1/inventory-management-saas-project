const storeService = require("../services/store.service");
const {
  createStoreValidation,
  updateStoreValidation,
} = require("../validations/store.validation");

const createStore = async (req, res, next) => {
  try {
    const { error, value } = createStoreValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        data: null,
      });
    }

    const store = await storeService.createStore(value);

    res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

const getStores = async (req, res, next) => {
  try {
    const stores = await storeService.getStores();

    res.status(200).json({
      success: true,
      message: "Stores retrieved successfully",
      data: stores,
    });
  } catch (error) {
    next(error);
  }
};

const getStoreById = async (req, res, next) => {
  try {
    const store = await storeService.getStoreById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Store retrieved successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

const updateStore = async (req, res, next) => {
  try {
    const { error, value } = updateStoreValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        data: null,
      });
    }

    const store = await storeService.updateStore(
      req.params.id,
      value
    );

    res.status(200).json({
      success: true,
      message: "Store updated successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStore = async (req, res, next) => {
  try {
    await storeService.deleteStore(req.params.id);

    res.status(200).json({
      success: true,
      message: "Store deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
};