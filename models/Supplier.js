const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Supplier name is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Two suppliers in the SAME store cannot share a name,
// but Company A and Company B CAN both have a supplier called "ABC Suppliers".
supplierSchema.index({ storeId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Supplier', supplierSchema);
