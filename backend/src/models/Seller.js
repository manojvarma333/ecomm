const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  licenceNumber: { type: String, required: true },
  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model('Seller', sellerSchema);
