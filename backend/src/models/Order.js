const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  name: String,
  price: Number,
  qty: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
    items: [orderItemSchema],
    total: Number,
    platformFee: { type: Number, default: 5 },
    ngoFee: { type: Number, default: 5 },
    tax: Number,
    grandTotal: Number,
    razorpayOrderId: { type: String },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'transferred', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
