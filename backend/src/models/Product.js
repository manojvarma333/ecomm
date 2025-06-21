const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    images: [{ type: String }], // base64 strings or URLs
    category: { type: String },
    isUnique: { type: Boolean, default: false },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
