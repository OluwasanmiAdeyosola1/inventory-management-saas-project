const mongoose = require('mongoose');
const supplierService = require('../services/supplier.service');
const {
  validateCreateSupplier,
  validateUpdateSupplier,
} = require('../validations/supplier.validation');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function createSupplier(req, res) {
  try {
    const errors = validateCreateSupplier(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const supplier = await supplierService.createSupplier(req.user.storeId, req.body);
    return res.status(201).json({ success: true, data: supplier });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A supplier with this name already exists for your store',
      });
    }
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
}

async function getSuppliers(req, res) {
  try {
    const suppliers = await supplierService.getSuppliers(req.user.storeId);
    return res.status(200).json({ success: true, data: suppliers });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
}

async function getSupplierById(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid supplier ID' });
    }

    const supplier = await supplierService.getSupplierById(req.user.storeId, req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    return res.status(200).json({ success: true, data: supplier });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
}

async function updateSupplier(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid supplier ID' });
    }

    const errors = validateUpdateSupplier(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const supplier = await supplierService.updateSupplier(req.user.storeId, req.params.id, req.body);
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    return res.status(200).json({ success: true, data: supplier });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A supplier with this name already exists for your store',
      });
    }
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
}

async function deleteSupplier(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid supplier ID' });
    }

    const supplier = await supplierService.deleteSupplier(req.user.storeId, req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    return res.status(200).json({ success: true, message: 'Supplier deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
}

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
