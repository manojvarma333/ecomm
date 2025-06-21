const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

module.exports = mongoose.model('Buyer', buyerSchema);
