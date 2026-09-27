const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');
const authenticate = require('../middleware/auth.middleware');
// const authorize = require('../middleware/role.middleware'); // uncomment if you want role restrictions

// All supplier routes require a logged-in user (sets req.user from the JWT)
router.use(authenticate);

// If the team decides only owner/admin can manage suppliers, add:
// router.use(authorize('owner', 'admin'));

router.post('/', supplierController.createSupplier);
router.get('/', supplierController.getSuppliers);
router.get('/:id', supplierController.getSupplierById);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
