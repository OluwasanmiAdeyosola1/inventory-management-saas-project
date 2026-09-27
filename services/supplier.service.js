const Supplier = require('../models/Supplier');

async function createSupplier(storeId, data) {
  return Supplier.create({
    name: data.name.trim(),
    email: data.email,
    phone: data.phone,
    address: data.address,
    storeId,
  });
}

async function getSuppliers(storeId) {
  return Supplier.find({ storeId }).sort({ createdAt: -1 });
}

async function getSupplierById(storeId, supplierId) {
  return Supplier.findOne({ _id: supplierId, storeId });
}

async function updateSupplier(storeId, supplierId, data) {
  return Supplier.findOneAndUpdate(
    { _id: supplierId, storeId },
    { $set: data },
    { new: true, runValidators: true }
  );
}

async function deleteSupplier(storeId, supplierId) {
  return Supplier.findOneAndDelete({ _id: supplierId, storeId });
}

/**
 * Used by the Products module (Person 5) to confirm a supplierId
 * belongs to the current store before saving a product.
 * Usage: const ok = await supplierService.supplierExists(req.user.storeId, req.body.supplierId);
 */
async function supplierExists(storeId, supplierId) {
  if (!supplierId) return false;
  const found = await Supplier.exists({ _id: supplierId, storeId });
  return !!found;
}

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  supplierExists,
};
